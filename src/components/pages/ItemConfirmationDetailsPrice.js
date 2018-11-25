import React, { Component } from 'react';
import { View, Image, Text,TextInput,Dimensions } from 'react-native';
import Button from '../ui/AddInventoryButton';

class ItemConfirmationDetailsPrice extends Component{
	
	render(){
		return(		
			    <View style={styles.CategoryContainer}>
			       <View style={styles.line}>
			       </View>
			       <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
			       <Text style={styles.attributesTitle}> Categories </Text>
			       </View>
			    </View>			
		);
	}
};

const styles ={
	CategoryContainer: {
		flex: 1
	},
	line: {
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: .5,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10
	},	
	attributesTitle:{
		flex: 3,
		fontSize: 17,
		color: '#2F3A49'
	}
}

export default ItemConfirmationDetailsPrice;