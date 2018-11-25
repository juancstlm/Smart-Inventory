import React, { Component } from 'react';
import { View, Image, Text,ScrollView } from 'react-native';
import { Dimensions } from 'react-native'
import Moment from 'react-moment';
import {format, compareAsc} from 'date-fns'
import DatePicker from 'react-native-datepicker'

class ItemDetailDate extends React.Component {
    
    state : {
      Expirationdate: '',
    } 

    constructor (props) {
      super(props)
      this.state = {
        Expirationdate:"2000-00-00"
      }
    }

    componentWillReceiveProps(nextProps){
      if (nextProps.itemExpirationDate !== this.props.itemExpirationDate) {
        this.setState({ Expirationdate: nextProps.itemExpirationDate })
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
              onDateChange={(date) => {this.setState({Expirationdate: date})}}
            />  
        )
    }


  render() {
    return (
            <View style={styles.card2}>              
                 <View style={{paddingLeft: 10}}>
                   <Text style={{fontSize: 17, color: '#2F3A49'}} > Expiration Date
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

export default ItemDetailDate;
