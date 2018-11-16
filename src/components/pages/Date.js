import React, { Component } from 'react';
import { View, Image, Text,ScrollView } from 'react-native';
import { Dimensions } from 'react-native'
import Moment from 'react-moment';
import {format, compareAsc} from 'date-fns'
import DatePicker from 'react-native-datepicker'

class Date extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        Expirationdate:"2018-11-16"
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
              minDate="2018-11-16"
              maxDate="2018-11-30"
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
                  color: '#8190A5'
                }   
              }}
              onDateChange={(date) => {this.setState({Expirationdate: date})}}
            />  
        )
    }


  render() {
    return (
            <View style={styles.card2}>              
                 <View style={{paddingLeft: 10}}>
                   <Text style={{fontSize: 17, color: '#8190A5'}} > Expiration Date
                   </Text>
                  </View>
              <View style={{paddingRight: 10}}>  
               {this.displayDatePicker()}
                </View>
           </View>
    );
  }
}

const styles = {
  card2:{
    height: 60,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center'
  }
};

export default Date;
