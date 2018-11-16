import React, { Component } from 'react';
import { View, Image, Text,ScrollView, TextInput } from 'react-native';
import { Dimensions } from 'react-native'
import Moment from 'react-moment';
import {format, compareAsc} from 'date-fns'
import DatePicker from 'react-native-datepicker'
import ExpirationDate from './Date'



//{moment(new Date()).format("YYYY-MM-DD hh:mm:ss")}
//var date1 = new Date('December 17, 1995 ');
//{date1.toString()}
//var dt = '2016-05-02T00:00:00';
// {Moment(dt)}
let {width, height} = Dimensions.get('window')
// height: 667

class ItemDetail extends React.Component{


	constructor (props) {
		super(props)
		this.state = {
			itemPrice: '00.00'
        }
    }


	onChangedPrice(text){ 
		var newText = ''; 
		var numbers = '0123456789'; 
		
		if(text.length < 1){ 
			this.setState({ myNumber: '' }); 
		} 

		for (var i=0; i < text.length; i++) { 
			if(numbers.indexOf(text[i]) > -1 ) { 
				newText = newText + text[i]; 
			} 
				this.setState({ myNumber: newText }); 
		} 
	}


	render(){
		return(
			
		    <ScrollView style={styles.scrollViewStyle}>
		       
		        <View style={styles.card0}>      
		             <View style={{paddingLeft: 10}}>
		               <Text style={{fontSize: 17, color: '#8190A5'}} > Price
		               </Text>
		              </View>

		       		<View style={{paddingRight: 10}}> 
						<TextInput 
						   style={styles.textInput}
						   keyboardType='numeric'
						   onChangeText={(text)=> this.onChangedPrice(text)}
						   value={this.state.itemPrice}
						   maxLength={10}  //setting limit of input
						/>
		          </View>
		        </View>
	       

		    <View style={styles.card1}>
		       <View style={styles.horizontalLine}> 
		       </View>
		       
		       <View style={{margin:10}}>
		          <Text style={{fontSize: 17, color: '#8190A5'}} > Categories 
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

		    <View style={styles.horizontalLine}>
		    </View>
	        <ExpirationDate>
	        </ExpirationDate>

		    <View style={styles.card3}>
		       <View style={styles.horizontalLine}>
		       </View>

		       <View style={{margin:10}}>
		          <Text style={{fontSize: 17, color: '#8190A5'}} > Inventories 
			      </Text>
			   </View>

			   <View style={styles.ellipse}>
			   </View>
		    </View>


		    <View style={styles.card4}>	       
		       <View style={styles.horizontalLine}>
		       </View>
		       
		       <View style={{justifyContent: 'center', flex: 1}}> 
		               <Text style={{textAlign: 'center', color: '#F7931E',fontSize: 15}}>
		                   EDIT ATTRIBUTES
		               </Text> 
		       </View>	    
		    </View>		

		       <View style={styles.box1} />
               <View style={styles.box2} />
               <View style={styles.box1} />      
		    </ScrollView>

		);
	}

};

const styles ={
	background:{
		flex:1
	},
	card0:{
		height:60,
		flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
	},
	card1:{
		height: 100,
		backgroundColor: 'white'
	},
	card2:{
		height: 60,
		flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
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
    },	
	card3:{
		height:120
	},
	ellipse: {
		flex: 1,
  	    borderRadius: 10,
  	    margin: 10,
  	    backgroundColor: '#FCFCFC',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 },  	
    },	
	card4:{
		height: 60
	},
	horizontalLine:{
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10
	},
	scrollViewStyle:{
		flex: 1
	},
	textInput: {
		fontSize: 17, 
		color: '#8190A5'
	}
}

export default ItemDetail;