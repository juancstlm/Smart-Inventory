import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Button, Text } from "native-base";
import { Divider } from 'react-native-elements'



class ItemConfirmationDetails extends Component {

	render() {
		var { width, height } = Dimensions.get('window')
		return (
			<View style={styles.background}>
			    
			    <View style={styles.card1}>
			           <Text style={styles.attributesTitle}> Inventories </Text>
			    </View>

			    <View style={styles.card2}>
			       <View style={styles.line}>
			       </View>

			           <Text style={styles.attributesTitle}> Categories </Text>

			    </View>
			    
			    <View style={styles.card3}>
			     	
			     	<View style={styles.line}>
			        </View>
			        
			            <Text style={styles.attributesTitle} > Attributes </Text>
	

			        <View style={styles.attributesList}>
			         <View style={styles.testView}>
			           <Text style={styles.TextComponentStyle}> Price </Text>
			           <Text style={styles.TextComponentStyle}> Purchase Date </Text>
			           <Text style={styles.TextComponentStyle}> Consumable </Text>
			           <Text style={styles.TextComponentStyle}> Expiration Date </Text>
			           <Text style={styles.TextComponentStyle}> Location </Text>
			          </View>
			        </View>
			    </View>

			</View>
		
		);
	}
}

const styles = {
	background: {
		flex: 1
	},
	card1: {
		flex: 1,
	},
	card2: {
		flex: 1,
	},
	line: {
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: .5,
        marginLeft: 10,
        marginRight: 10
	},
	card3: {
		flex: 1,
	},
	attributesTitleContainer: {
	},
	attributesTitle:{
		flex: 3,
		fontSize: 15,
		color: '#A9A9A9'
	},
	attributesList: {
		flex: 5
	},
	testView: {
	flex: 1,
	justifyContent: 'space-around', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
	},
	TextComponentStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F7931E',
    color: '#F7931E', 
    textAlign: 'center'
  }
};

export default ItemConfirmationDetails;