import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import ItemDetail from './ItemDetail'
import {connect} from 'react-redux';

class Item extends Component{

	static navigationOptions = {
    header: null
  };
	
	render(){

		const item = this.props.inventories.activeItem
		return(		
			<SafeAreaView style={styles.background}>

			  <View style={styles.card1}>
			    <Text style={styles.card1NameStyle}>
						{item.name}
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
			            source= {{uri: item.image}}
			      />
			  </View>
			
			  <View style={styles.card3}>
			       <ItemDetail>
			       </ItemDetail>
			  </View>
		    
		    </SafeAreaView>
		);
	}
};

export default connect(state=>state)(Item);

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