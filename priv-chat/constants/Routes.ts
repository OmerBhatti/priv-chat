import { BACKEND_URL } from '@/config';

export const API_ROUTES = {
	USERS: {
		LOGIN: `${BACKEND_URL}/api/users/login/`,
		REGISTER: `${BACKEND_URL}/api/users/register/`,
		VERIFY: `${BACKEND_URL}/api/users/verify/`,
		LOGOUT: `${BACKEND_URL}/api/users/logout/`,
	},
};
