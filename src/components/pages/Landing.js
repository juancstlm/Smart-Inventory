import React from "react";
import { View, StatusBar, Image, SafeAreaView } from "react-native";
import { Button, Text } from "native-base";

export default class Landing extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2F3A49" }}>
        <StatusBar translucent barStyle="light-content" />
        <Image
          source={require("../../img/logo.png")}
          style={{
            width: 150,
            height: 150,
            overflow: "visible",
            marginTop: 35,
            marginBottom: 15
          }}
          alignSelf="center"
        />
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 15,
            marginRight: 1,
            alignContent: "center"
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 40, textAlign: "center" }}>
            Welcome to Smart Inventory
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center" }}>
            The best way to keep track of all your items. Let's get started
          </Text>
        </View>
        <Text style={{ textAlign: "center", color: "#FFFFFF", fontSize: 12 }}>
          Continue with:
        </Text>
        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 10
          }}
        >
          <Button block
                  onPress={() => this.props.navigation.navigate('Authentication')}
          >
            <Text>EMAIL</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
