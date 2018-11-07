import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Button, Card, CardSection, Input, Spinner } from "../ui/index";
import firebase from "firebase";
import NavigationService from '../../../NavigationService';

export default class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    error: "",
    loading: false
  };

  checkIfUserExists = async () => {
    this.setState({
      error: ""
    });

    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.firstName == "" ||
      this.state.lastName == ""
    ) {
      this.errorMessage("Please fill in all required fields");
    } else if (!this.isEmailValid(this.state.email)) {
      this.errorMessage("Please use valid email address");
    } else if (this.state.password.length < 7) {
      this.errorMessage("Password needs to be at least 8 characters");
    } else {
      firebase
        .auth()
        .fetchSignInMethodsForEmail(this.state.email)
        .then(id => {
          try {
            //if id.length is 0, then user does not exist on db so let the user sign up
            if (id.length == 0) {
              this.signup();
            } else {
              this.errorMessage(
                "The email addreass is already in use. Please use different email address"
              );
            }
          } catch (error) {}
        });
    }
  };

  //Sign up using Firebase authentication and store values in realtime db.
  //When users sign up using Firebase authentication, unique ids are generated. We use these ids as keys to identify users in our db.
  signup = async () => {
    this.setState({
      loading: true,
      error: ""
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        try {
          var uid = firebase.auth().currentUser.uid;

          firebase
            .database()
            .ref("Users/" + uid + "/")
            .set({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              password: this.state.password
            })
            .then(() => {
              this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                loading: false,
                error: ""
              });
            });

          {
              NavigationService.navigate('InventoriesList');
          }
        } catch (error) {
          this.errorMessage(error);
        }
      });
  };

  errorMessage(s) {
    this.setState({
      loading: false,
      error: s
    });
  }

  isEmailValid(email) {
    if (email.match(/.+@.+/)) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Text >Sing Up</Text>
    );
  }

  spiner() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.checkIfUserExists}>Sign up</Button>;
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  inputTextStyle: {
    color: "red",
    borderColor: "blue"
  }
});
