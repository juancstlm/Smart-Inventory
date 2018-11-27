import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import ItemDetail from './ItemDetail'
import Firebase from "../../Firebase";
import {connect} from 'react-redux';
//source= {require("../../img/bike2.jpeg")}

class Item extends Component{

	static navigationOptions = {
		header: null
	};
	
	state : {
		price: '',
		image: '',
		quantity: '',
		expirationDate: '',
		users: [],
	} 

	constructor(props) {
		super(props);
		this.state = {
			price: '',
			image: '',
			quantity: '',
			expirationDate: '',
			users: []
		}
		this.updateDate = this.updateDate.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);	
		this.updateItem = this.updateItem.bind(this);
	}

    componentWillMount() {
        const inv = this.props.inventories.activeInventory
        users = []

        inv.users.map(user => {
            Firebase.firestore.collection("Users").doc(user).get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        users.push(doc.data());
                        this.setState({ users: users });
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
        })
    }

	updateFireBase = (updateMade) => {
		var id = this.props.inventories.activeItem.id;
        Firebase.firestore.collection("Items").doc(id).update(updateMade)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });		
	}

	updateItem = () => {
		var updateMade = {};
		if(this.state.price){updateMade.price = Number(this.state.price);}
		if(this.state.expirationDate){updateMade.expirationDate = this.state.expirationDate;}
		if(this.state.quantity){updateMade.quantity = Number(this.state.quantity);}
	    this.updateFireBase(updateMade);
	}

	updatePrice = (updatedPrice) => {
		this.setState({
			price: updatedPrice,
		});
	    console.log("updated price:",updatedPrice);
	}

	updateDate = (updatedData) => {
		this.setState({
			expirationDate: updatedData,
		});
	    console.log("updated date:",updatedData);
	}

	updateQuantity = (updatedQuantity) => {
		this.setState({
			quantity: updatedQuantity,
		});
	    console.log("updated quantity: ",updatedQuantity);
	}

	render(){
		const item = this.props.inventories.activeItem
		return(		
			<SafeAreaView style={styles.background}>

			  <View style={styles.card1}>
			    <Text style={styles.card1NameStyle}>
			        {item.name}
			    </Text>
			  </View>

			  <View style={styles.card2}>
			      <Image
			            style={{ 
			              flex: 1,
			              width: null,
			              height: null,
			              borderRadius: 10
			            }} 
			            source={{ uri: item.image }}
			      />
			  </View>
			
			  <View style={styles.card3}>
			       <ItemDetail 
			       		itemPrice={item.price} 
			       		itemExpirationDate={item.expirationDate} 
			       		itemQuantity={item.quantity}
			       		users={this.state.users}
			       		sendDate={this.updateDate} 
			       		sendPrice={this.updatePrice}
			       		sendQuantity={this.updateQuantity}
			       		updateItem={this.updateItem}
		       		>
			       </ItemDetail>
			  </View>
		    
		    </SafeAreaView>
		);
	}
};

export default connect(state=>state)(Item);

const styles ={
	background: {
		backgroundColor: '#2F3A49',
		flex: 1,
	},
	card1:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 20
	},
	card1NameStyle:{
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 40,
		color: '#FCFCFC'
	},
	card2:{
		flex:2,
		margin: 15,
		borderRadius: 10
	},
	card3:{
		flex:4,
		backgroundColor: '#FCFCFC',
		margin: 12,
		borderRadius: 10
	}
}