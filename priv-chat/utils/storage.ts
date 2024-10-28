import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
	USER_INFO: 'USER_INFO',
};

export const getItem = async (key: string) => {
	try {
		const dataString = await AsyncStorage.getItem(key);
		if (dataString) {
			return JSON.parse(dataString);
		}
		return null;
	} catch (error) {
		console.error('Error retrieving item:', error);
		return null;
	}
};

export const setItem = async (key: string, value: any) => {
	try {
		const data = JSON.stringify(value);
		await AsyncStorage.setItem(key, data);
		return true;
	} catch (error) {
		console.error('Error setting item:', error);
		return false;
	}
};
