import React, { Component } from 'react';
import { Modal, Text, View, Image, Dimensions, TextInput } from 'react-native';
import { Divider } from 'react-native-elements'
import ItemConfirmationDetailsPrice from './ItemConfirmationDetailsPrice'
import ItemConfirmationDetailsDate from './ItemConfirmationDetailsDate'
import ItemConfirmationDetailsInventory from './ItemConfirmationDetailsInventory'

class ItemConfirmationDetails extends Component {
	
	render() {
		return (		
			<View style={styles.background}>		    
			    <ItemConfirmationDetailsInventory sendInventory={this.props.sendInventory}>
			    </ItemConfirmationDetailsInventory>

			    <ItemConfirmationDetailsPrice sendPrice={this.props.sendPrice}>
			    </ItemConfirmationDetailsPrice>
			    
			    <ItemConfirmationDetailsDate sendDate={this.props.sendDate}>
			    </ItemConfirmationDetailsDate>
			</View>		
		);
	}
}

const styles = {
	background: {
		flex: 1
	},
	line: {
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: .5,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10
	}
};

export default ItemConfirmationDetails;