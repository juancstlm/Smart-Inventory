import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

class ItemDetailInventoryList extends React.Component {

	render(){
		return(	
			<View style={styles.ellipseContainer}>
					
				<View style={styles.inventoryNameContainer}>
					<View style={{margin:10}}>
						<Text style={{fontSize: 17, color: '#2F3A49'}}> Home Inventory
						</Text>
					</View>	
				</View>

				<View style={styles.inventoryUsersDisplay}>
					<View style={styles.usersListContainer}>
		                <Image style={styles.thumbnailStyle}  source= {require("../../img/bike.png")} />
		                <Image style={styles.thumbnailStyle}  source= {require("../../img/bike2.jpeg")} />
		                <Image style={styles.thumbnailStyle}  source= {require("../../img/orange.png")} />
	                </View>
				</View>
		
			</View>
		);
	}

};

const styles ={
	ellipseContainer:{
		flex: 4,
  	    borderRadius: 10,
  	    margin: 10,
  	    backgroundColor: '#FCFCFC',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 }		
	},
	inventoryNameContainer:{
		flex:1
	},
	inventoryUsersDisplay:{
		flex:1,
	},
	usersListContainer:{
		flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    thumbnailStyle:{
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 10
    }
}

export default ItemDetailInventoryList;