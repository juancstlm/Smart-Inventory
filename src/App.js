import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common'
import firebase from 'firebase'
import LoginForm from './components/LoginForm'
import Signup from './SignupForm/Signup'
import { createStackNavigator } from 'react-navigation';

class App extends Component {

	state = { loggedIn: null };

	componentWillMount() {

		firebase.initializeApp({
			apiKey: "AIzaSyAEmfChIahjgpB8PQu3VLaeOX8sOwm0k4g",
			authDomain: "smartinventory-1f53b.firebaseapp.com",
			databaseURL: "https://smartinventory-1f53b.firebaseio.com",
			projectId: "smartinventory-1f53b",
			storageBucket: "smartinventory-1f53b.appspot.com",
			messagingSenderId: "164089194254"
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button onPress={() => firebase.auth().signOut()}>
							Log Out
			   	</Button>
					</CardSection>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner size="large" />;
		}
	}

	render() {
		return (
			<RootStack />
			//  <View>
			//  <Header headerText="Authentication" />
			//  {this.renderContent()}
			//  </View>
		);
	}
}
//Specify view pages as routes here to use navigation. 
//https://reactnavigation.org/docs/en/getting-started.html
const RootStack = createStackNavigator(
	{
		Login: LoginForm,
		Signup: Signup,
	},
	{
		initialRouteName: 'Login',
	}
);

export default App;