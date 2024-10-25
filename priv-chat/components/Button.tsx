import { View, Text, TouchableOpacity } from 'react-native';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	onPress: () => void;
	title: string;
	fgColor?: string;
	bgColor?: string;
	style?: any;
	disabled?: boolean;
}>;

const Button = ({ onPress, title, style, fgColor = '#fff', bgColor = '#0a7ea4', disabled = false }: Props) => {
	return (
		<TouchableOpacity onPress={onPress} style={{ width: '100%' }} disabled={disabled}>
			<View
				style={[
					{
						backgroundColor: bgColor,
						opacity: disabled ? 0.5 : 1,
						padding: 10,
						paddingVertical: 15,
						borderRadius: 50,
						width: '-webkit-fill-available',
					},
					style,
				]}
			>
				<Text style={{ color: fgColor, textAlign: 'center' }}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Button;
