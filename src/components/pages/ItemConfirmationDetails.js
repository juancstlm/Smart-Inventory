import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements'
import ItemConfirmationDetailsInventory from './ItemConfirmationDetailsInventory'
import ItemConfirmationDetailsCategories from './ItemConfirmationDetailsCategories'
import ItemConfirmationDetailsAttributes from './ItemConfirmationDetailsAttributes'


class ItemConfirmationDetails extends Component {

	render() {
		var { width, height } = Dimensions.get('window')
		return (
		
			<View style={styles.background}>
			    <ItemConfirmationDetailsInventory>
			    </ItemConfirmationDetailsInventory>

			    <ItemConfirmationDetailsCategories>
			    </ItemConfirmationDetailsCategories>

			    <ItemConfirmationDetailsAttributes>
			    </ItemConfirmationDetailsAttributes>
			</View>
		
		);
	}
}

const styles = {
	background: {
		flex: 1
	}
};

export default ItemConfirmationDetails;