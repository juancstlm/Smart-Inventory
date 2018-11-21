import React, { Component } from 'react';
import { View, Image, Text,TextInput,Dimensions } from 'react-native';

let {width, height} = Dimensions.get('window')

class ItemDetailCategories extends Component{
	
	render(){
		return(		
			    <View style={styles.background}>
			       <View style={styles.horizontalLine}> 
			       </View>			       
			       <View style={{margin:10}}>
			          <Text style={{fontSize: 17, color: '#2F3A49'}} > Categories 
				      </Text>
				   </View>
			       <View style={{flex:1}}>
			         <View style={styles.categoryContainer}>
			           <View style={{marginLeft: 15}}>
			             <Text style={styles.categoryStyle}> Price </Text>
			           </View>
			           <View style={{marginLeft: 15}}>
			               <Text style={styles.categoryStyle}> {height} </Text>
			           </View>
			         </View>
			       </View>
			    </View>
		);
	}
};

const styles ={
	background: {
		height: 80,
		backgroundColor: 'white'
	},
	horizontalLine:{
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10
	},
	categoryContainer: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-start', 
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	    marginRight: 10,
	},
	categoryStyle: {
	    borderRadius: 10,
	    borderWidth: 1,
	    height: 30,
	    fontSize: 17,
	    borderColor: '#F7931E',
	    color: '#F7931E', 
	    textAlign: 'center'
    }
}

export default ItemDetailCategories;