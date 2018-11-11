import React from "react";
import { View, SafeAreaView } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
import LoginForm from "./LogIn";
import SignUp from "./Signup";
import {firestore} from 'firebase'

export default class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }

    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  static navigationOptions = {
    header: null
  };

  render() {
    const buttons = ['Log In', 'Sign Up'];
    const { selectedIndex } = this.state;



    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2F3A49" }}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 40, borderWidth: 0}}
          innerBorderStyle={{color: '#e79100'}}
          selectedBackgroundColor={"#e79627"}
          selectedTextStyle={{color: '#fff'}}
          selectedButtonStyle={{backgroundColor: '#e79627'}}
          buttonStyle={{backgroundColor:"#2f3a49", borderWidth: 0}}
          textStyle={{color:'#fff'}}
        />
        <View>
          {selectedIndex === 0 ? <LoginForm/> : <SignUp/>}
        </View>
      </SafeAreaView>
    );
  }
}
