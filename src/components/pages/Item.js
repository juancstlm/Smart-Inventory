import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import ItemDetail from './ItemDetail'

class Item extends Component{
	render(){
		return(
			
			<View style={styles.background}>
			
			
			  <View style={styles.card1}>
			    <View style={styles.card1NameContainer}>
			      <Text style={styles.card1NameStyle}>
			            Bike
			      </Text>
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
			            source= {require("../../img/bike2.jpeg")}
			      />
			  </View>
			
			
			  <View style={styles.card3}>
			       <ItemDetail>
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
		flex:1,
	},
	card1NameContainer:{
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