import { Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

export default function Index() {
	const router = useRouter();
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				marginHorizontal: 20,
			}}
		>
			<Image
				source={require('@/assets/images/partial-react-logo.png')}
				style={{
					maxWidth: 300,
					width: '100%',
					marginBottom: 20,
				}}
			/>
			<Text style={{ fontSize: 20 }}>
				Welcome to <Text style={{ fontWeight: 'bold' }}>PrivChat</Text>
			</Text>
			<Text suppressHighlighting style={{ fontSize: 14, color: '#999', marginTop: 10, marginBottom: 20 }}>
				Private and secure messaging one click away
			</Text>
			<Button
				title="Get Started"
				onPress={() => {
					router.navigate('/login');
				}}
				style={{
					marginBottom: 10,
				}}
			/>
		</View>
	);
}
