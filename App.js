import React, { Component } from "react";
import firebase from "firebase";
import InventoriesList from "./src/components/pages/InventoriesList";
import Landing from "./src/components/pages/Landing";
import { createStackNavigator } from "react-navigation";
import Authentication from "./src/components/pages/Authentication";
import NavigationService from "./NavigationService";
import { ThemeProvider } from "react-native-elements";
import {theme} from './theme'
import Firebase from './src/Firebase'

class App extends Component {

  constructor(){
    super();
  }

  state = {
    loggedIn: false
  }

  componentWillMount() {
    Firebase.init();

    Firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    })
  }

  render() {

    const RootStack = createStackNavigator(
      {
        Landing: Landing,
        Authentication: Authentication,
        InventoriesList: InventoriesList
      },
      {
        initialRouteName: this.state.loggedIn ? 'InventoriesList' :"Landing"
        // initialRouteName: "InventoriesList" // FOR TEST ONLY
      },
      {
        headerMode: "none",
        navigationOptions: {
          headerVisible: false
        }
      }
    );

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


export default App;
