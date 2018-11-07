import React from "react";
import { View, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import LoginForm from "./LogIn";
import SignUp from "./Signup";

export default class Authentication extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2F3A49" }}>
        <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center',
        alignContent: 'center'}}>
          <Button
            buttonStyle={{maxWidth: 85}}
            backgroundColor={"#e79627"}
            raised
            borderRadius={4}
            title={"Log In"}
            onPress={console.log("log in")}
          />
          <Button
            buttonStyle={{maxWidth: 85}}
            backgroundColor={"#e79627"}
            raised
            borderRadius={4}
            title={"Sign Up"}
            onPress={console.log("sign up")}
          />
        </View>
      </SafeAreaView>
    );
  }
}
