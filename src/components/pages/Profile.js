import React from "react";
import Firebase from "../../Firebase";
import { SafeAreaView } from "react-native";
import { Header, Icon } from "react-native-elements";

export default class Profile extends React.Component {
  logOut = () => {
    Firebase.auth.signOut();
  };
  render() {
    return (
      <SafeAreaView>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          rightComponent={<Icon name="logout" onPress={this.logOut} />}
        />
      </SafeAreaView>
    );
  }
}
