import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Button from '../ui/ItemConfirmationButton';
import ItemConfirmationDetails from './ItemConfirmationDetails'
import Firebase from "../../Firebase";

class ItemConfirmation extends Component {
	
	state : {
		price: '',
		expirationDate: '',
		name: '',
		quantity: '',
		imagePath: '',
		imagefirebase: '',
	}

	constructor(props) {
		super(props);
		const { params } = props.navigation.state;			
		this.state = {
	      price: '',
	      expirationDate: '',
	      quantity: '',
	      name: params.itemName,
	      imagePath: params.imagePath,
	      imagefirebase: params.imagefirebase,
	    };
	    this.setDate = this.setDate.bind(this);
		this.setPrice = this.setPrice.bind(this);
		this.setQuantity = this.setQuantity.bind(this);
	}

	saveItemToFireBase = (item) => {
        Firebase.firestore.collection("Items").add(item)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });  
        
        this.props.navigation.navigate('InventoriesList')   		
	}

	saveItem = () => {
		var item = {};
		if(this.state.name){item.name = this.state.name;}
		if(this.state.imagefirebase){item.Image = this.state.imagefirebase;}
		if(this.state.price){item.price = Number(this.state.price);}
		if(this.state.expirationDate){item.expirationDate = this.state.expirationDate;}
		if(this.state.quantity){item.quantity = Number(this.state.quantity);}
	    this.saveItemToFireBase(item);
	}

	setPrice = (updatedPrice) => {
		this.setState({
			price: updatedPrice,
		});
	    console.log("updated price: ",updatedPrice);
	}

	setDate = (updatedData) => {
		this.setState({
			expirationDate: updatedData,
		});
	    console.log("updated date: ",updatedData);
	}

	setQuantity = (updatedQuantity) => {
		this.setState({
			quantity: updatedQuantity,
		});
	    console.log("updated quantity: ",updatedQuantity);
	}
	
	render() {	
		return (
			<View style={styles.background}>
			    
			    <View style={styles.card1}>
			        <View style={styles.itemNameContainer}>
			            <Text style={styles.itemNameStyle}>{this.state.name}</Text>
			        </View>
			    </View>
			
			    <View style={styles.card2}>
			        <Image
			            style={{ 
			              flex: 1,
			              width: null,
			              height: null,
			              borderRadius: 10
			            }} 
			            source={{ isStatic: true, uri: this.state.imagePath.uri }}
			        />
			    </View>

			    <View style={styles.card3}>
			        <ItemConfirmationDetails sendDate={this.setDate} sendPrice={this.setPrice} sendQuantity={this.setQuantity}>
			        </ItemConfirmationDetails>
			    </View>
					
			    <View style={styles.card4}>
			        <Button block onPress={this.saveItem}>
                         <Text>SAVE</Text>
                    </Button>
			    </View>
			    
			</View>
		);
	}
}

const styles = {
	background: {
		backgroundColor: '#2F3A49',
		flex: 1,
	},
	card1: {
		flex:2,
		backgroundColor: '#2F3A49'
	},
	itemNameContainer:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 5
	},
	itemNameStyle: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 40,
		color: '#FCFCFC'
	},
	card2: {
		flex:4,
		alignItems: 'stretch',
		backgroundColor: 'pink',
		margin: 10,
		borderRadius: 10
	},
	card3: {
		flex:6,
		backgroundColor: '#FCFCFC',
		margin: 10,
		borderRadius: 10
	},
	card4: {
		flex: 1,
		backgroundColor: '#2F3A49',
		margin: 10,
	}

};

export default ItemConfirmation;