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
		imagePath: '',
		imagefirebase: '',
		inventory: '',
		Matches: [] 
	}

	constructor(props) {
		super(props);
		const { params } = props.navigation.state;			
		this.state = {
	      price: '',
	      expirationDate: '',
	      inventory: '',
	      name: params.itemName,
	      imagePath: params.imagePath,
	      imagefirebase: params.imagefirebase,
	      Matches: [] 
	    };
	    this.getData = this.getData.bind(this);
		this.getPrice = this.getPrice.bind(this);
		this.getInventory = this.getInventory.bind(this);	
	}

	getPrice = (updatedPrice) => {
		this.setState({
			price: updatedPrice,
		});
	    console.log("updated price: ",updatedPrice);
	}

	getData = (updatedData) => {
		this.setState({
			expirationDate: updatedData,
		});
	    console.log("updated datey: ",updatedData);
	}

	getInventory = (updatedInventory) => {
		this.setState({
			inventory: updatedInventory,
		});
	    console.log("updated inventoryyy: ",updatedInventory);
	}

	async saveToFireBase() {

		Firebase.firestore.collection("Items").add({
		    name: 'Tokyo',
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		});	

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
			        <ItemConfirmationDetails sendDate={this.getData} sendPrice={this.getPrice} sendInventory={this.getInventory}>
			        </ItemConfirmationDetails>
			    </View>
					
			    <View style={styles.card4}>
			        <Button block onPress={this.saveToFireBase}>
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