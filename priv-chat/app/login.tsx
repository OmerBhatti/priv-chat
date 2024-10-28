import { Alert, ToastAndroid, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Text } from 'react-native-paper';
import Button from '@/components/Button';

import { useRouter } from 'expo-router';
import { login, startVerification } from '@/api';
import { setItem, STORAGE_KEYS } from '@/utils';

const Login = () => {
	const router = useRouter();
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async () => {
		setError('');
		if (loginData.email === '' || loginData.password === '') {
			setError('Email and password are required');
			return;
		}
		else if (loginData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
			setError('Please enter a valid email');
			return;
		}

		try {
			setIsLoading(true);
			const response = await login(loginData);
			if (response.token) {
				await setItem(STORAGE_KEYS.USER_INFO, {
					token: response.token,
					verified: response.verified,
					fullName: response.fullName,
					email: response.email,
				});
			}

			// Email Verification
			if (!response.verified) {
				try {
					const verification = await startVerification();
					if (verification.detail) {
						ToastAndroid.show(verification.detail, ToastAndroid.SHORT);
						setIsLoading(false);
						router.push('/verify');
					}
				} catch (error: any) {
					Alert.alert('Error', error.message);
					setIsLoading(false);
				}
			} else {
				ToastAndroid.show('Login successful', ToastAndroid.SHORT);
				router.push('/chat');
			}
			setIsLoading(false);
		} catch (error: any) {
			Alert.alert('Error', error.message);
			setIsLoading(false);
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
			<Text variant="headlineMedium">login</Text>
			<Text variant="titleMedium" style={{ color: '#999', marginBottom: 20 }}>
				Welcome to PrivChat
			</Text>
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
				value={loginData.password}
				onChangeText={text => {
					setError('');
					setLoginData({ ...loginData, password: text });
				}}
				secureTextEntry={!showPassword}
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
				title="Login"
				onPress={handleLogin}
				style={{ marginTop: 20 }}
				disabled={error !== '' || isLoading}
			/>
			<Button
				title="Create an account"
				onPress={() => {
					router.navigate('/register');
				}}
				disabled={isLoading}
				style={{ marginTop: 10 }}
				fgColor="#0a7ea4"
				bgColor="#f2f2f2"
			/>
		</View>
	);
};

export default Login;
