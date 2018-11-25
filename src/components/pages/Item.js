import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import ItemDetail from './ItemDetail'
import Firebase from "../../Firebase";
//source= {require("../../img/bike2.jpeg")}
class Item extends Component{
	
	state : {
		name: '',
		price: '',
		image: '',
		quantity: '',
		categories: [],
		expirationDate: '',
	} 

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			price: '',
			image: '',
			quantity: '',
			categories: [],
			expirationDate: '',
		}
	}

	async componentDidMount() {
		var currentThis = this;

		Firebase.firestore.collection("Items").doc("Sc1hSLwJfeKiGu92GdzT")
		    .onSnapshot(function(doc) {
		        console.log("Current data bitch: ", doc.data());
		        currentThis.setState({ 
		        	name: doc.data().name,
		        	image: doc.data().image,
		        	price: doc.data().price,
		        	expirationDate: doc.data().expirationDate, 
		        })
		    });
	}

	render(){
		var image = this.state.image;
		var price = this.state.price;
		var expirationDate = this.state.expirationDate;
		return(		
			<View style={styles.background}>

			  <View style={styles.card1}>
			    <Text style={styles.card1NameStyle}>
			        {this.state.name}
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
			            source={{ uri: image }}
			      />
			  </View>
			
			  <View style={styles.card3}>
			       <ItemDetail itemPrice={price} itemExpirationDate={expirationDate}>
			       </ItemDetail>
			  </View>
		    
		    </View>		    
		);
	}
};

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

export default Item;