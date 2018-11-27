import React, { Component } from 'react';
import { View, Image, Text,TextInput,Dimensions } from 'react-native';
import Button from '../ui/AddInventoryButton';
import DatePicker from 'react-native-datepicker'

class ItemConfirmationDetailsDate extends Component{

	state : {
		Expirationdate: '',
	} 

	constructor(props) {
		super(props);
		this.state = {
			Expirationdate:"2018-11-30",
		}
	}

    displayDatePicker(){
          return (
            <DatePicker
              style={{width: 150}}
              date={this.state.Expirationdate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2018-11-27"
              maxDate="2019-12-30"
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

	render(){
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
		);
	}
};

const styles ={
	dataContainer:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	}
}

export default ItemConfirmationDetailsDate;