import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
	return (
		<PaperProvider theme={{ dark: false }}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="login" options={{ headerShown: false }} />
				<Stack.Screen name="register" options={{ headerShown: false }} />
				<Stack.Screen name="verify" options={{ headerShown: false }} />
			</Stack>
		</PaperProvider>
	);
}
