import React, { Component } from "react";
import LoginForm from './components/pages/LoginForm';
import Signup from './components/pages/Signup';
import Landing from "./components/pages/Landing";
import InventoriesList from "./components/pages/InventoriesList";
import InventoryDetail from './components/pages/InventoryDetail';
import { createStackNavigator } from "react-navigation";
import Authentication from "./components/pages/Authentication";
import NavigationService from "../NavigationService";
import { ThemeProvider } from "react-native-elements";
import { theme } from "../theme";
import Firebase from "./Firebase";
import Profile from './components/pages/Profile'
import Item from './components/pages/Item'
import ItemConfirmation from './components/pages/ItemConfirmation'
import CameraCoreML from './components/pages/CameraCoreML'
import CameraClarifai from './components/pages/CameraClarifai'
import CameraSelectItem from './components/pages/CameraSelectItem'
import {connect} from 'react-redux'
import {getUserDetails, getAuthStatus, getOwnInventories,
  getSharedInventories
} from '../src/redux/actions/App'

const mapStateToProps = ({user}) => ({
  user,
})

const mapDispatchToProps = {
  getUserDetails,
  getAuthStatus,
  getOwnInventories,
  getSharedInventories
}

class SmartInventory extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    Firebase.init();

    Firebase.auth.onAuthStateChanged(user => {

      if(!!user){
        this.props.getUserDetails(user.uid);
        this.props.getOwnInventories();
        this.props.getSharedInventories();
        this.props.getAuthStatus(!!user);
      }
      this.props.getAuthStatus(!!user);
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
      },
      {
        initialRouteName: "Item",
        // headerMode: 'none'
      }
    );

    return (
      <ThemeProvider theme={theme}>
        {this.props.user.authStatusReported ? (
          this.props.user.isUserAuthenticated ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(SmartInventory);
