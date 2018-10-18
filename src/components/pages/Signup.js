import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../ui/index';
import firebase from 'firebase';

export default class SignUp extends Component {
    state = { email: '', password: '', firstName: '', lastName: '', error: '', loading: false };

    //Sign up using Firebase authentication and store values in realtime db. 
    //When users sign up using Firebase authentication, unique ids are generated. We use these ids as keys to identify users in our db. 
    signup = async () => {

        if (this.state.email && this.state.password && this.state.firstName && this.state.lastName != "") {

            this.setState({
                loading: true,
                error: '',
            })

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {

                try {
                    var uid = firebase.auth().currentUser.uid

                    firebase.database().ref('Users/' + uid + '/').set({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password,
                    })
                        .then(() => {

                            this.setState({
                                email: '',
                                password: '',
                                firstName: '',
                                lastName: '',
                                loading: false,
                                error: '',
                            })
                        })
                } catch (error) {
                    console.log(error)
                    this.errorMessage('Sign up failed')
                }
            })
        } else {
            this.errorMessage('Please fill in all required fields')
        }
    }

    errorMessage(s) {

        this.setState({
            loading: false,
            error: s,
        })

    }

    render() {
        return (

            <Card>

                <CardSection>
                    <Input
                        label="FirstName"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChangeText={firstName => this.setState({ firstName })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="LastName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChangeText={lastName => this.setState({ lastName })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Email"
                        placeholder="Email"
                        value={this.state.emal}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    <Button onPress={this.signup}>
                        Sign up
					</Button>
                </CardSection>

            </Card>

        );
    }

}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};