import React from "react";
import { View, SafeAreaView } from "react-native";
import { Content, Form, Item, Input, Tab, Tabs } from "native-base";
import { createMaterialTopTabNavigator } from "react-navigation";
import LoginForm from "./LogIn";
import SignUp from "./Signup";

export default class Authentication extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2F3A49" }}>
        <Content>
          <Tabs
            style={{ backgroundColor: "#e79627" }}
            tabBarActiveTextColor="#FFFFFF"
            tabBarInactiveTextColor="#FFFFFF"
            tabBarBackgroundColor="#2F3A49"
            tabBarUnderlineStyle={null}
          >
            <Tab heading="Log In" >
              <LoginForm />
            </Tab>
            <Tab heading="Sing Up">
              <SignUp />
            </Tab>
          </Tabs>
        </Content>
      </SafeAreaView>
    );
  }
}
