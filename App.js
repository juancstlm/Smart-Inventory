import React, { Component } from "react";
import firebase from "firebase";
import InventoriesList from "./src/components/pages/InventoriesList";
import Landing from "./src/components/pages/Landing";
import { createStackNavigator } from "react-navigation";
import Authentication from "./src/components/pages/Authentication";
import NavigationService from "./NavigationService";
import { ThemeProvider } from "react-native-elements";
import { theme } from "./theme";
import Firebase from "./src/Firebase";
import Profile from './src/components/pages/Profile'

interface AppState {
  authStatusReported: boolean;
  isUserAuthenticated: boolean;
}

class App extends Component<AppState> {
  constructor() {
    super();
  }

  state: AppState = {
    authStatusReported: false,
    isUserAuthenticated: false
  };

  componentWillMount() {
    Firebase.init();

    Firebase.auth.onAuthStateChanged(user => {
      // if (user) {
      //   this.setState({ authStatusReported });
      // } else {
      //   this.setState({ loggedIn: false });
      // }
      this.setState({
        authStatusReported: true,
        isUserAuthenticated: !!user
      });
    });
  }

  render() {
    const RootStack = createStackNavigator(
      {
        InventoriesList: InventoriesList,
        Profile: Profile,
      },
      {
        initialRouteName: "InventoriesList",
        headerMode: 'none'
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
        {this.state.authStatusReported ? (
          this.state.isUserAuthenticated ? (
            <RootStack
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          ) : (
            <Authentication />
          )
        ) : (
          <Landing />
        )}
      </ThemeProvider>
    );
  }
}
//Specify view pages as routes here to use navigation.
//https://reactnavigation.org/docs/en/getting-started.html

export default App;
