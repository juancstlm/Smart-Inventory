import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../components/common';
import firebase from 'firebase';

export default class Signup extends Component {
    state = { email: '', password: '', firstName: '', lastName: '', error: '', loading: false };


    signup = async () => {

        if (this.state.email && this.state.password && this.state.firstName && this.state.lastName != "") {

            this.setState({ loading: true })


            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {

                try {
                    if (user) {

                        var uid = firebase.auth().currentUser.uid

                        firebase.database().ref('Users/' + uid + '/').set({
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            email: this.state.email,
                            password: this.state.password,
                        })
                            .then(() => {

                                this.setState
                                    ({
                                        email: '',
                                        password: '',
                                        firstName: '',
                                        lastName: '',
                                        loading: false,
                                        error: ''
                                    })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    } else { }
                } catch (error) {
                    console.log('error')
                }

            })
                .catch(() => { this.setState({ error: "Sign up failed" }) })

        }
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