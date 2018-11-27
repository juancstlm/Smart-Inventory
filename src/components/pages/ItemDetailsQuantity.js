import React, { Component } from 'react';
import { View, Image, Text, TextInput,Dimensions } from 'react-native';
import Button from '../ui/AddInventoryButton';

class ItemDetailsQuantity extends Component{

	state : {
		quantity: '',
	} 

	constructor(props) {
		super(props);
		this.state = {
			quantity: '1'
		}
	}

	onQuantityChange(text){ 
		var newText = ''; 
		var numbers = '0123456789'; 
		
		if(text.length < 1){ 
			this.setState({ myNumber: '' }); 
		} 

		for (var i=0; i < text.length; i++) { 
			if(numbers.indexOf(text[i]) > -1 ) { 
				newText = newText + text[i]; 
			}
		}
		this.props.sendQuantity(newText);
	}

	render(){
		quantity = this.props.itemQuantity;
		console.log("littlebitch: ", quantity);
		return(		
			<View style={styles.qContainer}>
				<View style={{paddingLeft: 10}}>
					<Text style={{fontSize: 17, color: '#2F3A49'}}> Quantity  
					</Text>
				</View>
				
				<View style={{paddingRight: 15}}> 
					<TextInput 
					   style={{fontSize: 17, color: '#2F3A49'}}
					   keyboardType='numeric'
					   onChangeText={(text)=> this.onQuantityChange(text)}
					   value={`${quantity}`}
					   maxLength={10}  //setting limit of input
					/>
				</View>		
			</View>	
		);
	}
};

const styles ={
	qContainer:{
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	}
}

export default ItemDetailsQuantity;