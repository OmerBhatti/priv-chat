import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext) || {};

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// Load user data from AsyncStorage when the app starts
	useEffect(() => {
		const loadUserData = async () => {
			const data = await getItem(STORAGE_KEYS.USER_INFO);
			setUser(data);
			setIsLoading(false);
		};

		loadUserData();
	}, []);

	// Save user data to AsyncStorage when user state changes
	useEffect(() => {
		const saveUserData = async () => {
			await setItem(STORAGE_KEYS.USER_INFO, user);
			setIsLoading(false);
		};

		saveUserData();
	}, [user]);

	const login = userInfo => {
		setUser(userInfo);
	};

	const updateUser = data => {
		setUser({
			...user,
			...data,
		});
	};

	const logout = () => {
		setUser(null);
	};

	return isLoading ? (
		<>{children}</>
	) : (
		<UserContext.Provider
			value={{
				user,
				login,
				logout,
				updateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
