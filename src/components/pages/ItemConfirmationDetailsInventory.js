import React, { Component } from 'react';
import { View, Image, Text,TextInput,Dimensions } from 'react-native';
import Button from '../ui/AddInventoryButton';

class ItemConfirmationDetailsInventory extends Component{
	
	render(){
		return(		
			    <View style={styles.InventoryContainer}>		           
			           <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
				           <Text  style={{ fontSize: 17, color: '#2F3A49'}}> Inventories 
				           </Text>		   
					   </View>
					   <View style={{flex: 1}}>
					        <Button block onPress={() => this.props.navigation.navigate('Item')}>
		                         <Text>ADD TO INVENTORY</Text>
		                    </Button>
						</View>
			    </View>
		);
	}

};

const styles ={
	InventoryContainer: {
		flex: 1
	},
}

export default ItemConfirmationDetailsInventory;