// CombinedProvider.tsx
import React from 'react';
import { UserProvider } from './userProvider';

export const StateProvider = ({ children }) => {
	return <UserProvider>{children}</UserProvider>;
};
