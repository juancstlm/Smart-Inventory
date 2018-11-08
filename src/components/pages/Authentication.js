import React from "react";
import { View, SafeAreaView } from "react-native";
import { Content, Form, Item, Input, Tab, Tabs } from "native-base";
import LoginForm from "./LoginForm";
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
