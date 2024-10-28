import { Alert, ToastAndroid, View } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { TextInput, Text } from 'react-native-paper';
import Button from '@/components/Button';
import { register } from '@/api';

const Register = () => {
	const router = useRouter();
	const [loginData, setLoginData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState<string>('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleRegister = async () => {
		setError('');
		if (loginData.firstName === '' || loginData.lastName === '') {
			setError('First name and last name are required');
			return;
		} else if (loginData.email === '' || loginData.password === '') {
			setError('Email and password are required');
			return;
		} else if (loginData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
			setError('Please enter a valid email');
			return;
		} else if (loginData.password.length < 8) {
			setError('Password must be at least 8 characters');
			return;
		} else if (loginData.password !== loginData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		try {
			setIsLoading(true);
			const response = await register(loginData);
			if (response?.token) {
				setIsLoading(false);
				ToastAndroid.show('Registration successful', ToastAndroid.SHORT);
				router.navigate('/login');
			}
			setIsLoading(false);
		} catch (error: any) {
			Alert.alert('Error', error.message);
			setIsLoading(false);
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
			<Text variant="headlineMedium">Register</Text>
			<Text variant="titleMedium" style={{ color: '#999', marginBottom: 20 }}>
				Let's get started
			</Text>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ flex: 1, marginRight: 10 }}>
					<Text variant="labelLarge" style={{ marginTop: 15, marginBottom: 5 }}>
						First Name *
					</Text>
					<TextInput
						disabled={isLoading}
						value={loginData.firstName}
						onChangeText={text => {
							setError('');
							setLoginData({ ...loginData, firstName: text });
						}}
						mode="outlined"
						placeholder="John"
						style={{ backgroundColor: '#f2f2f2', height: 45 }}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<Text variant="labelLarge" style={{ marginTop: 15, marginBottom: 5 }}>
						Last Name *
					</Text>
					<TextInput
						disabled={isLoading}
						value={loginData.lastName}
						onChangeText={text => {
							setError('');
							setLoginData({ ...loginData, lastName: text });
						}}
						mode="outlined"
						placeholder="Doe"
						style={{ backgroundColor: '#f2f2f2', height: 45 }}
					/>
				</View>
			</View>
			<Text variant="labelLarge" style={{ marginTop: 15, marginBottom: 5 }}>
				Email *
			</Text>
			<TextInput
				disabled={isLoading}
				value={loginData.email}
				onChangeText={text => {
					setError('');
					setLoginData({ ...loginData, email: text });
				}}
				mode="outlined"
				placeholder="abc@mail.com"
				style={{ width: '100%', backgroundColor: '#f2f2f2', height: 45 }}
			/>
			<Text variant="labelLarge" style={{ marginTop: 15, marginBottom: 5 }}>
				Password *
			</Text>
			<TextInput
				disabled={isLoading}
				right={
					<TextInput.Icon
						onPress={() => setShowPassword(!showPassword)}
						icon={showPassword ? 'eye' : 'eye-off'}
					/>
				}
				secureTextEntry={!showPassword}
				value={loginData.password}
				onChangeText={text => {
					setError('');
					setLoginData({ ...loginData, password: text });
				}}
				mode="outlined"
				placeholder="********"
				style={{ width: '100%', backgroundColor: '#f2f2f2', height: 45 }}
			/>
			<Text variant="labelLarge" style={{ marginTop: 15, marginBottom: 5 }}>
				Confirm Password *
			</Text>
			<TextInput
				disabled={isLoading}
				right={
					<TextInput.Icon
						onPress={() => setShowConfirmPassword(!showConfirmPassword)}
						icon={showConfirmPassword ? 'eye' : 'eye-off'}
					/>
				}
				value={loginData.confirmPassword}
				onChangeText={text => {
					setError('');
					setLoginData({ ...loginData, confirmPassword: text });
				}}
				secureTextEntry={!showConfirmPassword}
				mode="outlined"
				placeholder="********"
				style={{ width: '100%', backgroundColor: '#f2f2f2', height: 45 }}
			/>
			{error && (
				<Text variant="labelLarge" style={{ color: '#ff4444', marginVertical: 5 }}>
					{error}
				</Text>
			)}
			<Button
				title="Register"
				onPress={handleRegister}
				style={{ marginTop: 20 }}
				disabled={error !== '' || isLoading}
			/>
			<Button
				disabled={isLoading}
				title="Login"
				onPress={() => {
					router.navigate('/login');
				}}
				style={{ marginTop: 10 }}
				fgColor="#0a7ea4"
				bgColor="#f2f2f2"
			/>
		</View>
	);
};

export default Register;
