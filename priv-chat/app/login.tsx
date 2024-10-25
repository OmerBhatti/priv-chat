import { View } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Text } from 'react-native-paper';
import Button from '@/components/Button';

import { useRouter } from 'expo-router';

const Login = () => {
	const router = useRouter();
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string>('');

	const handleLogin = () => {
		setError('');
		if (loginData.email === '' || loginData.password === '') {
			setError('Email and password are required');
			return;
		} else if (loginData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
			setError('Please enter a valid email');
			return;
		}
		console.log(loginData);
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
			<Button title="Login" onPress={handleLogin} style={{ marginTop: 20 }} disabled={error !== ''} />
			<Button
				title="Create an account"
				onPress={() => {
					router.navigate('/register');
				}}
				style={{ marginTop: 10 }}
				fgColor="#0a7ea4"
				bgColor="#f2f2f2"
			/>
		</View>
	);
};

export default Login;
