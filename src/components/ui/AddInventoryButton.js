import React from 'react'
import { Text,TouchableOpacity } from 'react-native'

const AddInventoryButton = ({ onPress, children }) => {
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
		fontSize: 13,
		fontWeight: '600'
	},
	buttonStyle: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#2F3A49',
		borderRadius: 5,
		marginLeft: 10,
		marginRight: 10
	}
};

export default AddInventoryButton;