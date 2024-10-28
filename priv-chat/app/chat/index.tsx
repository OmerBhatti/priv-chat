import { Text, View } from 'react-native';
import React from 'react';
import { useUser } from '@/context/userProvider';
import { useRouter } from 'expo-router';

export const Chat = () => {
	const router = useRouter();
	const { user } = useUser();

	return (
		<View style={{ padding: 20 }}>
			<Text>Chat</Text>
		</View>
	);
};

export default Chat;
