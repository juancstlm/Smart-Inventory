import React from 'react'
import { Text,TouchableOpacity } from 'react-native'

const Button = ({ onPress, children }) => {
	const { buttonStyle, textStyle } = styles;

	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
		    <Text style={textStyle}>
		        {children}
		    </Text>
		</TouchableOpacity>
	);
};

const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	},
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#e79627',
		borderRadius: 5,
		marginLeft: 5,
		marginRight: 5
	}
};

export { Button };