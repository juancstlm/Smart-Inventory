import React, { Component } from 'react';
import { View, Image, Text, TextInput,Dimensions } from 'react-native';
import Button from '../ui/AddInventoryButton';

class ItemConfirmationDetailsAttributes extends Component{
	
	render(){
		return(		
			    <View style={styles.AttributesContainer}>	     	
			     	<View style={styles.line}>
			        </View>

			        <View style={{flex: 2, paddingLeft: 10, paddingTop: 10}}>
				        <Text style={styles.attributesTitle} > Attributes </Text>
			        </View>

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
		);
	}

};

const styles ={
	AttributesContainer: {
		flex: 1
	},
	line: {
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: .5,
        marginLeft: 10,
        marginRight: 10
	},
	attributesTitle:{
		flex: 3,
		fontSize: 17,
		color: '#2F3A49'
	},
	attributesList: {
		flex: 4,
	},
	testView: {
	flex: 1,
	justifyContent: 'flex-start', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
	},
	TextComponentStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F7931E',
    color: '#F7931E', 
    textAlign: 'center',
    marginLeft: 10,
  }
}

export default ItemConfirmationDetailsAttributes;