import { getItem, STORAGE_KEYS } from './storage';

export const HEADERS = {
	Accept: '*/*',
	'Content-Type': 'application/json',
};

const getToken = async () => {
	try {
		const data = await getItem(STORAGE_KEYS.USER_INFO);
		return data?.token || null;
	} catch (error) {
		return null;
	}
};

function camelToSnake(camelObj: any) {
	let snakeObj: any = {};
	for (let key in camelObj) {
		if (camelObj.hasOwnProperty(key)) {
			// Convert camelCase to snake_case
			let snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

			// Recursively apply to nested objects or arrays
			if (typeof camelObj[key] === 'object' && !Array.isArray(camelObj[key])) {
				snakeObj[snakeKey] = camelToSnake(camelObj[key]);
			} else if (Array.isArray(camelObj[key])) {
				snakeObj[snakeKey] = camelObj[key].map(item => (typeof item === 'object' ? camelToSnake(item) : item));
			} else {
				snakeObj[snakeKey] = camelObj[key];
			}
		}
	}
	return snakeObj;
}

function snakeToCamel(snakeObj: any) {
	let camelObj: any = {};
	for (let key in snakeObj) {
		if (snakeObj.hasOwnProperty(key)) {
			// Convert snake_case to camelCase
			let camelKey = key.replace(/(_\w)/g, match => match[1].toUpperCase());

			// Recursively apply to nested objects or arrays
			if (typeof snakeObj[key] === 'object' && !Array.isArray(snakeObj[key])) {
				camelObj[camelKey] = snakeToCamel(snakeObj[key]);
			} else if (Array.isArray(snakeObj[key])) {
				camelObj[camelKey] = snakeObj[key].map(item => (typeof item === 'object' ? snakeToCamel(item) : item));
			} else {
				camelObj[camelKey] = snakeObj[key];
			}
		}
	}
	return camelObj;
}

export const performAPICall = async (url: string, method: string, body?: any, useAuth?: any) => {
	const token = await getToken();
	try {
		const requestParams: { [key: string]: any } = {
			method,
			headers: {
				Authorization: useAuth && token ? `Token ${token}` : '',
				...HEADERS,
			},
		};
		if (body) {
			requestParams.body = JSON.stringify(camelToSnake(body));
		}
		const response = await fetch(url, requestParams);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data['detail']);
		}
		return snakeToCamel(data);
	} catch (error: any) {
		throw new Error(error.message);
	}
};
