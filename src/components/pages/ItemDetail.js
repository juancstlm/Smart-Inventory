import React, { Component } from 'react';
import { View, Image, Text,ScrollView, TextInput } from 'react-native';
import { Dimensions } from 'react-native'
import Moment from 'react-moment';
import {format, compareAsc} from 'date-fns'
import ItemDetailPrice from './ItemDetailPrice'
import ItemDetailDate from './ItemDetailDate'
import ItemDetailsQuantity from './ItemDetailsQuantity'
import ItemDetailInventory from './ItemDetailInventory'

class ItemDetail extends React.Component{

	update = () => {
		this.props.updateItem();
	}

	render(){
		price = this.props.itemPrice;
		expirationDate = this.props.itemExpirationDate;
		quantity = this.props.itemQuantity;
		users = this.props.users;
		return(		
		    <ScrollView style={styles.scrollViewStyle}>

		        <ItemDetailPrice itemPrice={price} sendPrice={this.props.sendPrice}>
		        </ItemDetailPrice>
  
			    <View style={styles.horizontalLine}>
			    </View>

		        <ItemDetailDate itemExpirationDate={expirationDate} sendDate={this.props.sendDate}>
		        </ItemDetailDate>

			    <View style={styles.horizontalLine}>
			    </View>

		        <ItemDetailsQuantity itemQuantity={quantity} sendQuantity={this.props.sendQuantity}>
		        </ItemDetailsQuantity>

		        <ItemDetailInventory users={users}>
		        </ItemDetailInventory>

			    <View style={styles.editContainer}>	       
			       <View style={styles.horizontalLine}>
			       </View>	       
			       <View style={{justifyContent: 'center', flex: 1}}> 
			               <Text style={{textAlign: 'center', color: '#F7931E',fontSize: 15}} onPress={this.update}>
			                   EDIT ATTRIBUTES
			               </Text> 
			       </View>	    
			    </View>		
     
		    </ScrollView>
		);
	}
};

const styles ={	
	editContainer:{
		height: 60
	},
	horizontalLine:{
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
	},
	scrollViewStyle:{
		flex: 1
	}
}

export default ItemDetail;