import React, { Component } from 'react';
import { View, Image, Text,ScrollView } from 'react-native';
import { Dimensions } from 'react-native'

let {width, height} = Dimensions.get('window')
// height: 667

class ItemDetail extends Component{

	render(){
		return(
			
		    <ScrollView style={styles.scrollViewStyle}>
		       
		        <View style={styles.card1}>      
		             <View style={{paddingLeft: 10}}>
		               <Text style={{fontSize: 20, color: '#8190A5'}} > Price
		               </Text>
		              </View>
		       		<View style={{paddingRight: 10}}> 
		                <Text style={{fontSize: 20, color: '#8190A5'}} > $699.99 
		            </Text>
		          </View>
		        </View>
	

		    <View style={styles.card2}>
		       <View style={styles.horizontalLine}> 
		       </View>
		       
		       <View style={{margin:10}}>
		          <Text style={{fontSize: 20, color: '#8190A5'}} > Categories 
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



		    <View style={styles.card3}>
		       <View style={styles.horizontalLine}>
		       </View>

		       <View style={{margin:10}}>
		          <Text style={{fontSize: 20, color: '#8190A5'}} > Inventories 
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
	card1:{
		height:60,
		flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
	},
	card1TextContainer: {

	},
	card2:{
		height: 100,
		backgroundColor: 'white'
	},
	card3:{
		height:120
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
    fontSize: 20,
    borderColor: '#F7931E',
    color: '#F7931E', 
    textAlign: 'center'
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
  scrollViewStyle:{
  	flex: 1
  },
  box1: {
    height: 200,
    backgroundColor: 'blue'
  },
  box2: {
    height: 200,
    backgroundColor: 'purple'
  }
}

export default ItemDetail;