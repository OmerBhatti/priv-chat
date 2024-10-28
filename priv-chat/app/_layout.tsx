import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { StateProvider } from '@/context';

export default function RootLayout() {
	return (
		<StateProvider>
			<PaperProvider theme={{ dark: false }}>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="login" options={{ headerShown: false }} />
					<Stack.Screen name="register" options={{ headerShown: false }} />
					<Stack.Screen name="verify" options={{ headerShown: false }} />
					<Stack.Screen name="chat/index" options={{ headerTitle: 'PrivChat', headerBackVisible: false }} />
				</Stack>
			</PaperProvider>
		</StateProvider>
	);
}
