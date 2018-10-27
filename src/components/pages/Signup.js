import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../ui/index';
import firebase from 'firebase';

export default class SignUp extends Component {
    state = { email: '', password: '', firstName: '', lastName: '', error: '', loading: false };

    checkIfUserExists = async () => {

        this.setState({
            error: '',
        })

        if (this.state.email == "" || this.state.password == "" || this.state.firstName == "" || this.state.lastName == "") {
            this.errorMessage('Please fill in all required fields')
            
        } else if (!this.isEmailValid(this.state.email)) {
            this.errorMessage('Please use valid email address')
            
        } else if (this.state.password.length < 7) {
            this.errorMessage('Password needs to be at least 8 characters')
            
        } else {
        firebase.auth().fetchSignInMethodsForEmail(this.state.email).then((id) => {
            try {
                //if id.length is 0, then user does not exist on db so let the user sign up
                if (id.length == 0) {
                    this.signup()
                } else {
                    this.errorMessage('The email addreass is already in use. Please use different email address')
                }
            } catch (error) {
                
            }
        })
    }
    }


    //Sign up using Firebase authentication and store values in realtime db. 
    //When users sign up using Firebase authentication, unique ids are generated. We use these ids as keys to identify users in our db. 
    signup = async () => {
        
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

                    { this.props.navigation.replace('InventoriesList') }
                } catch (error) {
                    this.errorMessage(error)
                }
            })
        
    }

    errorMessage(s) {

        this.setState({
            loading: false,
            error: s,
        })

    }

    isEmailValid (email) {

        if(email.match(/.+@.+/)) {
            return true;
        }
            return false;
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
                    {this.spiner()}
                </CardSection>

            </Card>

        );
    }

    spiner() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return ( <Button onPress={this.checkIfUserExists}>
                        Sign up
					</Button>
        )
    }

}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};