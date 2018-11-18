import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import ItemDetailInventoryList from './ItemDetailInventoryList'
import Button from '../ui/AddInventoryButton';

class ItemDetailInventory extends React.Component {

	render(){
		return(	
			    <View style={styles.InventoryContainer}>
			       <View style={styles.horizontalLine}>
			       </View>
			       <View style={{margin:10}}>
			          <Text style={{fontSize: 17, color: '#2F3A49'}} > Inventories 
				      </Text>
				   </View>
				   <View style={{flex: 1}}>
					   <ItemDetailInventoryList>
					   </ItemDetailInventoryList>			   
					   <View style={{flex: 1}}>
						   	<Button block onPress={() => this.props.navigation.navigate('Landing')}>
		                         <Text>Add To Inventory</Text>
		                    </Button>
					   </View>
				   </View>
			    </View>
		);
	}

};

const styles ={
	InventoryContainer:{
		height:190		
	},
	horizontalLine:{
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10
	}
}

export default ItemDetailInventory;