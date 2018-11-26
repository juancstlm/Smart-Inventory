import React, { Component } from 'react';
import { View, Image, Text,TextInput,Dimensions } from 'react-native';
import Button from '../ui/AddInventoryButton';
import ModalFilterPicker from 'react-native-modal-filter-picker'
import Firebase from "../../Firebase";

class ItemConfirmationDetailsInventory extends Component{

	state : {
		price: '',
	} 

	constructor(props) {
		super(props);
		this.state = {      
			picked: null,
	        visible: false,
	        inventories: []
		}
	}

	async componentDidMount() {
		var currentThis = this;
		var inventories = [];

		Firebase.firestore.collection("Inventories").get().then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		        inventories.push({
		        	name: doc.data().name,
		        	image: doc.data().image,

		        })
		    });
			var arr = [];
			for(var i = 0, len = inventories.length; i < len; i++) {
			  arr.push( {"key": inventories[i].name, "label": inventories[i].name});
			}
			currentThis.setState({ inventories: arr });	    
		});
	}
	
	onShow = () => {
		this.setState({ visible: true });
	}

    onSelect = (picked) => {
    	this.setState({
    		picked: picked,
    		visible: false
    	})
    	this.props.sendInventory(picked);
    }

    onCancel = () => {
    	this.setState({
    		visible: false
    	});
    }

	render(){
		const { visible, picked } = this.state;
		return(		
		    <View style={styles.InventoryContainer}>		           
		           <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
			           <Text  
			           style={{ fontSize: 17, color: '#2F3A49'}}
			           > 
		           			INVENTORY 
			           </Text>		   
				   </View>
				   <View style={{flex: 1}}>
				        <Button block onPress={this.onShow}>
	                         <Text>ADD TO INVENTORY</Text>
	                    </Button>
					</View>
				<ModalFilterPicker
		          visible={visible}
		          onSelect={this.onSelect}
		          onCancel={this.onCancel}
		          options={this.state.inventories}
		        />
		    </View>
		);
	}

};

const styles ={
	InventoryContainer: {
		flex: 1
	}
}

export default ItemConfirmationDetailsInventory;