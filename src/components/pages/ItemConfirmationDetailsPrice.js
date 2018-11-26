import React, { Component } from 'react';
import { View, Image, Text,TextInput,Dimensions } from 'react-native';
import Button from '../ui/AddInventoryButton';

class ItemConfirmationDetailsPrice extends Component{

	state : {
		price: '',
	} 

	constructor(props) {
		super(props);
		this.state = {
			price: '00.00'
		}
	}

	onChangedPrice(text){ 
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
		this.props.sendPrice(newText);
	}

	render(){
		return(		
			<View style={styles.priceContainer}>				
				<View style={{paddingLeft: 10}}>
					<Text style={{fontSize: 17, color: '#2F3A49'}}> Enter Pricez:  
					</Text>
				</View>
				
				<View style={{paddingRight: 15}}> 
					<TextInput 
					   style={{fontSize: 17, color: '#2F3A49'}}
					   keyboardType='numeric'
					   onChangeText={(text)=> this.onChangedPrice(text)}
					   value={"$" + this.state.price}
					   maxLength={10}  //setting limit of input
					/>
				</View>
			</View>	
		);
	}
};

const styles ={
	priceContainer:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	}
}

export default ItemConfirmationDetailsPrice;