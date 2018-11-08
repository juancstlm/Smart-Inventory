import React, { Component } from "react";
import firebase from "firebase";
import InventoriesList from "./src/components/pages/InventoriesList";
import Landing from "./src/components/pages/Landing";
import { createStackNavigator } from "react-navigation";
import Authentication from "./src/components/pages/Authentication";
import NavigationService from "./NavigationService";
import { ThemeProvider } from "react-native-elements";
import {theme} from './theme'

class App extends Component {
  componentWillMount() {
    //TODO move this into its own file
    firebase.initializeApp({
      apiKey: "AIzaSyAEmfChIahjgpB8PQu3VLaeOX8sOwm0k4g",
      authDomain: "smartinventory-1f53b.firebaseapp.com",
      databaseURL: "https://smartinventory-1f53b.firebaseio.com",
      projectId: "smartinventory-1f53b",
      storageBucket: "smartinventory-1f53b.appspot.com",
      messagingSenderId: "164089194254"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <RootStack
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ThemeProvider>
    );
  }
}
//Specify view pages as routes here to use navigation.
//https://reactnavigation.org/docs/en/getting-started.html
const RootStack = createStackNavigator(
  {
    Landing: Landing,
    Authentication: Authentication,
    InventoriesList: InventoriesList
  },
  {
    initialRouteName: "Landing"
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default App;
