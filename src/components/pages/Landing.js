import React from "react";
import { View, StatusBar, Image, SafeAreaView, Text } from "react-native";

export default class Landing extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2F3A49" }}>
        <StatusBar translucent barStyle="light-content" />
        <View
          style={{
            marginTop: 90,
            // marginBottom: 20,
            // marginLeft: 15,
            // marginRight: 1,
            // alignContent: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../../img/logo.png")}
            style={{
              width: 150,
              height: 150,
              overflow: "visible"
              // marginTop: 35,
              // marginBottom: 15,
              // justifyContent: 'center',
              // alignItems: 'center'
            }}
            // alignSelf="center"
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 36,
              fontWeight: "600",
              marginTop: 20
            }}
          >
            Smart Inventory
          </Text>
        </View>
        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 10
          }}
        />
      </SafeAreaView>
    );
  }
}
