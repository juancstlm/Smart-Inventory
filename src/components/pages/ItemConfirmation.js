import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import firebase from 'firebase';
import Button from '../ui/ItemConfirmationButton';
import ItemConfirmationDetails from './ItemConfirmationDetails'
//{{ uri: this.state.path }}
// source= {{ uri: JSON.parse(JSON.stringify(itemName)) }}
// source= {require("../../img/bike2.jpeg")}
//source= {{ uri: JSON.parse(JSON.stringify(imagePath)) }}
class ItemConfirmation extends Component {

	render() {
		const { navigation } = this.props;
		const imagePath = navigation.getParam('imagePath', 'NO-Path');
		const itemName = navigation.getParam('itemName','No-Item');
		
		console.log("help help help");
		console.log(imagePath)

		return (
			<View style={styles.background}>
			    
			    <View style={styles.card1}>
			        <View style={styles.itemNameContainer}>
			            <Text style={styles.itemNameStyle}> {JSON.parse(JSON.stringify(itemName))}</Text>
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
			            source={{uri: imagePath}}
			        />
			    </View>

			    <View style={styles.card3}>
			        <ItemConfirmationDetails navigation={this.props.navigation}>
			        </ItemConfirmationDetails>
			    </View>
			
			
			    <View style={styles.card4}>
			        <Button block onPress={() => this.props.navigation.navigate('Item')}>
                         <Text>CONTINUE</Text>
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