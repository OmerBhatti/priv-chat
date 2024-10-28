import { API_ROUTES } from '@/constants/Routes';
import { performAPICall } from '@/utils/api';

export const login = async (loginData: { email: string; password: string }) => {
	const data = performAPICall(API_ROUTES.USERS.LOGIN, 'POST', loginData);
	return data;
};

export const register = async (registerData: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}) => {
	const data = performAPICall(API_ROUTES.USERS.REGISTER, 'POST', registerData);
	return data;
};

export const logout = async () => {
	const data = performAPICall(API_ROUTES.USERS.LOGOUT, 'GET', null, true);
	return data;
};

export const startVerification = async () => {
	const data = performAPICall(API_ROUTES.USERS.VERIFY, 'GET', null, true);
	return data;
};

export const verify = async (otp: string) => {
	const data = performAPICall(API_ROUTES.USERS.VERIFY, 'POST', { otp }, true);
	return data;
};
