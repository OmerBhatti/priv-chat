import { Alert, BackHandler, Text, View } from 'react-native';
import React from 'react';
import { useUser } from '@/context/userProvider';
import { useRouter } from 'expo-router';

export const Chat = () => {
	const router = useRouter();
	const { user } = useUser();

	BackHandler.addEventListener('hardwareBackPress', () => {
		Alert.alert(
			'Exit App',
			'Do you want to exit?',
			[
				{
					text: 'Cancel',
					onPress: () => {
						// Do nothing
					},
					style: 'cancel',
				},
				{ text: 'YES', onPress: () => BackHandler.exitApp() },
			],
			{ cancelable: false }
		);

		return true;
	});

	return (
		<View style={{ padding: 20 }}>
			<Text>Chat</Text>
		</View>
	);
};

export default Chat;
