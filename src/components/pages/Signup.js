import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import firebase from "firebase";
import NavigationService from '../../../NavigationService';
import { Button, Input } from "react-native-elements";

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
      <View>
        <View style={{alignItems: "center"}}>
          <Input
            placeholder="Email"
            errorMessage={
              this.state.error ? "Please enter a valid Email address" : null
            }
            onChangeText={text => this.handleEmailChange(text)}
            containerStyle={styles.containerStyle}
          />
          <Input
            placeholder="First Name"
            containerStyle={styles.containerStyle}
            // errorMessage={
            //   this.state.error ? "Please enter a valid Email address" : null
            // }
            // onChangeText={text => this.handleEmailChange(text)}
          />
          <Input
            placeholder="Last Name"
            containerStyle={styles.containerStyle}
            // errorMessage={
            //   this.state.error ? "Please enter a valid Email address" : null
            // }
            // onChangeText={text => this.handleEmailChange(text)}
          />
          <Input
            placeholder="Password"
            containerStyle={styles.containerStyle}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={{marginLeft: 18, marginRight: 18, marginTop: 20}}>
        <Button
          title="Continue"
          loading={this.state.loading}
          onPress={this.handleLogIn}
        />
        </View>
      </View>
    );
  }

  spiner() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.checkIfUserExists}>Sign up</Button>;
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  containerStyle: {
    paddingBottom: 10,
    paddingTop: 10,
  }
};
