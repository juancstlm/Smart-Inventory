import React from "react";
import { View, StatusBar, Image, SafeAreaView } from "react-native";
import {Button, Text} from "native-base";

export default class Landing extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2F3A49" }}>
        <StatusBar translucent barStyle="light-content" />
          <Image
            source={require("../../img/logo.png")}
            style={{ width: 150, height: 150, overflow: "visible" }}
            alignSelf='center'
          />
          <View>
              <Text>Welcome to Smart Inventory</Text>
              <Text>The best way to keep track of all your items. Let's get started</Text>
          </View>
          <Text>Continue with:</Text>
          <Button block>
              <Text>EMAIL</Text>
          </Button>
      </SafeAreaView>
    );
  }
}
