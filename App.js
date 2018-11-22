import React, { Component } from "react";
import LoginForm from './src/components/pages/LoginForm';
import Signup from './src/components/pages/Signup';
import Landing from "./src/components/pages/Landing";
import InventoriesList from "./src/components/pages/InventoriesList";
import InventoryDetail from './src/components/pages/InventoryDetail';
import { createStackNavigator } from "react-navigation";
import Authentication from "./src/components/pages/Authentication";
import NavigationService from "./NavigationService";
import { ThemeProvider } from "react-native-elements";
import { theme } from "./theme";
import Firebase from "./src/Firebase";
import Profile from './src/components/pages/Profile'
import Item from './src/components/pages/Item'
import ItemConfirmation from './src/components/pages/ItemConfirmation'
import CameraCoreML from './src/components/pages/CameraCoreML'
import CameraClarifai from './src/components/pages/CameraClarifai'
import CameraSelectItem from './src/components/pages/CameraSelectItem'
import Gallery from './src/components/pages/Gallery'

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
        LoginForm: LoginForm,
        Signup: Signup,
        Profile: Profile,
        ItemConfirmation: ItemConfirmation,
        Item: Item,
        InventoriesList: InventoriesList,
        InventoryDetail: InventoryDetail,
        Landing: Landing,
        CameraCoreML: CameraCoreML,
        CameraClarifai: CameraClarifai,                
        CameraSelectItem: CameraSelectItem,
        Gallery: Gallery
      },
      {
        initialRouteName: "Gallery",
        // headerMode: 'none'
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
