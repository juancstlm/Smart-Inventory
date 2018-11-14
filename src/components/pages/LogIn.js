import React, { Component } from "react";
import { View } from "react-native";
import NavigationService from "../../../NavigationService";
import { Input, Button } from "react-native-elements";
import validator from "validator";
import Firebase from '../../Firebase'

class LoginForm extends Component {
  state = { email: "", password: "", error: "", loading: false };

  handleLogIn = () => {
    const { email, password } = this.state;
    this.setState({ error: "" });
    if (email === "") {
      this.setState({ error: "Please enter email address" });
    } else if (password === "") {
      this.setState({ error: "Please enter password" });
    } else {
      this.setState({ error: "", loading: true });


      console.log("FIREBASE", Firebase);
      Firebase.auth.signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(e => {
          this.onLoginFail();
        });
    }
  };

  onLoginFail() {
    //single line code below should move to onLoginSuccess
    //{this.props.navigation.navigate('InventoriesList')}

    this.setState({ error: "Authentication Failed", loading: false });
  }
  onLoginSuccess() {
    NavigationService.navigate("InventoriesList");
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: false
    });
  }

  handleEmailChange = email => {
    this.setState({ email: email, error: !validator.isEmail(email) });
  };

  render() {
    return (
      <View>
        <View style={{alignItems: "center"}}>
          <Input
            containerStyle={styles.containerStyle}
            placeholder="Email"
            errorMessage={
              this.state.error ? "Please enter a valid Email address" : null
            }
            onChangeText={text => this.handleEmailChange(text)}
          />
          <Input
            placeholder="Password"
            containerStyle={styles.containerStyle}
            secureTextEntry
            keyboardType={'email-address'}
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

export default LoginForm;
