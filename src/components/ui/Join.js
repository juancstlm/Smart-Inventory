import React from 'react';
import {TouchableOpacity, Text, TextInput, View, StyleSheet, Image} from 'react-native';
import InventoryCard from './InventoryCard';
import InventoryCardSection from './InventoryCardSection';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Join = () => {

    callParent = () => {
        //props.callbackFromParent(props.inventory);
    }
    onSuccess= (e) => {
        Linking
          .openURL(e.data)
          .catch(err => console.error('An error occured', err));
    }

    return (
        <View style={{flex: 1, width:'100%', backgroundColor: '#2f3a49', alignItems: 'center'}}>
            <TextInput
                    style={{
                      color: "white",
                      height: 40,
                      width: "80%",
                      backgroundColor: "#8190a5",
                      borderWidth: 1,
                      borderRadius: 3,
                      marginBottom: 15,
                      marginTop: 10,
                    }}
                    placeholder={" Enter Quick Share Code"} 
                    placeholderTextColor={"white"}/>
            <Text style={{color: "white", height: 40,}}>
                Join Via QR Code
            </Text>  

            <View style={{height: 200, backgroundColor: "white"}}>
                <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <Text style={styles.centerText}>
                        Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> 
                        on your computer and scan the QR code.
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                }/>    
            </View>
        </View >
    );

};

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
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
