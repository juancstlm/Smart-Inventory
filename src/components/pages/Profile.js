import React from "react";
import Firebase from "../../Firebase";
import { SafeAreaView, } from "react-native";
import { Header, Icon } from "react-native-elements";

export default class Profile extends React.Component {

  static navigationOptions = {
    title: 'Profile',
    headerRight: <Icon name="exit-to-app" color="#fff" />,
    headerStyle:{backgroundColor: '#2f3a49'},
    header: null,
    headerTransparent: true,
  };

  logOut = () => {
    Firebase.auth.signOut();
  };
  static logOut = () => {
    Firebase.auth.signOut();
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#2f3a49'}}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          containerStyle={{
            backgroundColor: "#2f3a49",
            borderBottomColor: "#2f3a49",
            justifyContent: "space-around"
          }}
          rightComponent={
            <Icon name="exit-to-app" color="#fff" onPress={this.logOut} />
          }
        />
      </SafeAreaView>
    );
  }
}
