import React from 'react'
import { View } from 'react-native'

const CardSection = (props) => {
	return (
		<View style={styles.containerStyle}>
		{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		borderColor: '#ddd',
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative',
		padding: 5

	}
}
export {CardSection};