import { Alert, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import Button from '@/components/Button';
import { OtpInput } from 'react-native-otp-entry';

import { verify } from '@/api';
import { getItem, setItem, STORAGE_KEYS } from '@/utils';
import { useRouter } from 'expo-router';

export const Verify = () => {
	const [verificationCode, setVerificationCode] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleVerification = async () => {
		try {
			setIsLoading(true);
			const response = await verify(verificationCode);
			if (response?.detail) {
				const userInfo = await getItem(STORAGE_KEYS.USER_INFO);
				await setItem(STORAGE_KEYS.USER_INFO, {
					...userInfo,
					verified: true,
				});
				router.navigate('/chat');
			}
			setIsLoading(false);
		} catch (error: any) {
			Alert.alert('Error', error?.message);
			setIsLoading(false);
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
			<Text variant="headlineMedium">Account Verification</Text>
			<Text variant="titleMedium" style={{ color: '#999', marginBottom: 20 }}>
				Check your email for a verification code
			</Text>
			<OtpInput
				autoFocus
				numberOfDigits={6}
				focusColor="#0a7ea4"
				focusStickBlinkingDuration={500}
				onTextChange={text => setVerificationCode(text)}
				type="numeric"
				textInputProps={{
					accessibilityLabel: 'One-Time Password',
				}}
			/>
			<Button title="Verify" onPress={handleVerification} style={{ marginTop: 15 }} disabled={isLoading} />
		</View>
	);
};

export default Verify;
