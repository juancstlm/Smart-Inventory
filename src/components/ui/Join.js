import React from 'react';
import {TouchableOpacity, Text, TextInput, View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toaster, { ToastStyles } from 'react-native-toaster'
import rootReducer from  '../../redux/reducers/inventories'
import Firebase from '../../Firebase'
import * as firebase from 'firebase';
import inventories from '../../redux/reducers/inventories';

class Join extends React.Component {

  state={scan: false, qrcode: '', disableJoin: true, message: null}

  onSuccess= (e) => {
    this.setState({qrcode: e.data})

    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  setScan = () =>{
    //this.setState({ scan: true });
  }

  join = () => {
    myState = this;
    if (this.state.qrcode === ''){
      console.log('Join code not set')
    }
    else{
      //add user as member of inventory with join code 'qrcode'

      var inv = Firebase.firestore.collection("Inventories").doc(this.state.qrcode);
      // Atomically add a new user to the "users" array field.
      inv.update({
          users: firebase.firestore.FieldValue.arrayUnion(Firebase.auth.currentUser.uid)
      }).then(function() {
        console.log("User successfully Added!");
        myState.setState({message: { text: 'Joined Inventory!', styles: ToastStyles.success }});
        
      }).catch(function(error) {
          // The document probably doesn't exist.
          console.log("Error adding user: ");
          myState.setState({message: { text: 'Inavlid Invite Code!', styles: ToastStyles.error }});
          
      });
    
    }
      
  }

  render(){
    return (
      <View style={{flex: 1, height: '100%',width:'100%', backgroundColor: '#2f3a49', alignItems: 'center'}}>
        <TextInput
          onChangeText={(text) => {this.setState({qrcode: text});
            this.setState({disableJoin: (this.state.qrcode.length < 5)});}}
          clearButtonMode='while-editing'
          autoFocus={true}
          style={{
            color: "white",
            height: 40,
            fontSize: 18,
            width: "80%",
            backgroundColor: "#8190a5",
            borderWidth: 1,
            borderRadius: 3,
            marginBottom: 15,
            marginTop: 10,
          }}
          placeholder={" Enter quick share code"}
          placeholderTextColor={"white"}/>
        <Text style={{color: "white", height: 40, fontSize: 18}}>
          Join Via QR Code
        </Text>

        {this.state.scan === false ?
          <TouchableOpacity onPress={this.setScan} style={{marginBottom: 60}}>
            <Image source={require("../../img/qr-button.png")}/>
          </TouchableOpacity>
          :
          <View style={{height: '50%', backgroundColor: "white"}}>
            <QRCodeScanner
              onRead={this.onSuccess.bind(this)}
              topContent={
                <Text style={styles.centerText}>
                  Go to wikipedia.org/wiki/QR_code
                  on your computer and scan the QR code.
                </Text>
              }/>

          </View>
        }

        { <Toaster message={this.state.message} onHide={()=> {this.setState({message: null})}}/>}

        <View style={{width: '40%', alignItems:'stretch'}}>
          <Button onPress={this.join} title='JOIN' disabled={this.state.disableJoin}/>
        </View>

      </View >
    );
  }

};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Join;
