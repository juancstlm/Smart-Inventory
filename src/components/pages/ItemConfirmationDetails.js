import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TextInput } from 'react-native';
import { Divider } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Button from '../ui/AddInventoryButton';

class ItemConfirmationDetails extends Component {
	
	state : {
		price: '',
	} 

	constructor(props) {
		super(props);
		this.state = {
			price: '00.00',
			Expirationdate:"2018-11-30"
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
		}
		this.props.sendPrice(newText);
	}

    displayDatePicker(){
          return (
            <DatePicker
              style={{width: 150}}
              date={this.state.Expirationdate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2018-11-24"
              maxDate="2018-12-30"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                  borderWidth: 0
                },
                dateIcon: {
                  width:0,
                  height:0,
                },
                dateText: {
                  fontSize: 17,
                  color: '#2F3A49'
                }   
              }}
              onDateChange={(date) => {
              	this.setState({
              		Expirationdate: date
              	})
              	this.props.sendDate(date);
              }}
            />  
        )
    }

	handleClick = () => {
		console.log("this is Inventories button");
	}
	
	renderInventory(){
		return(
		    <View style={styles.InventoryContainer}>		           
		           <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
			           <Text  
			           style={{ fontSize: 17, color: '#2F3A49'}}
			           > 
		           			Inventories 
			           </Text>		   
				   </View>
				   <View style={{flex: 1}}>
				        <Button block onPress={this.handleClick}>
	                         <Text>ADD TO INVENTORY</Text>
	                    </Button>
					</View>
		    </View>
		)
	}

	renderPrice(){
		var price = "00.00"
		return(
			<View style={styles.priceContainer}>				
				<View style={{paddingLeft: 10}}>
					<Text style={{fontSize: 17, color: '#2F3A49'}}> Enter Price:  
					</Text>
				</View>
				
				<View style={{paddingRight: 15}}> 
					<TextInput 
					   style={{fontSize: 17, color: '#2F3A49'}}
					   keyboardType='numeric'
					   onChangeText={(text)=> this.onChangedPrice(text)}
					   value={"$" + this.state.price}
					   maxLength={10}  //setting limit of input
					/>
				</View>
			</View>		
		)
	}

	renderDate(){
		var data = "2000-00-00"
		return(
			<View style={styles.dataContainer}>
				<View style={{paddingLeft: 10}}>
					<Text style={{fontSize: 17, color: '#2F3A49'}}> Expiration date:  
					</Text>
				</View>
				
				<View style={{paddingRight: 0}}> 
					{this.displayDatePicker()}
				</View>			
			</View>		
		)
	}

	render() {
		var { width, height } = Dimensions.get('window')
		return (
		
			<View style={styles.background}>
			    {this.renderInventory()}
			    {this.renderPrice()}
			    {this.renderDate()}
			</View>
		
		);
	}
}

const styles = {
	background: {
		flex: 1
	},
	InventoryContainer: {
		flex: 1
	},
	priceContainer:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	dataContainer:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	line: {
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: .5,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10
	}
};

export default ItemConfirmationDetails;