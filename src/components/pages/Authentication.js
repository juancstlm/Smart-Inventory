import React from "react";
import { View, SafeAreaView } from "react-native";
import { Content, Form, Item, Input } from "native-base";
import {createMaterialTopTabNavigator} from 'react-navigation'
import LoginForm from './LogIn'
import SignUp from './Signup'


class Authentication extends React.Component {
  static navigationOptions = {
      header: null,
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2F3A49" }}>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          </Form>
        </Content>
      </SafeAreaView>
    );
  }
}

export default createMaterialTopTabNavigator({
    LogIn: LoginForm,
    SignUp: SignUp,
});
