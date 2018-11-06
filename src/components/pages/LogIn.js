import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from '../ui/index';


class LoginForm extends Component {
	state = { email: '1@yahoo.com', password: '123456', error: '', loading: false };

	onButtonPress() {
		const { email, password } = this.state;
		this.setState({ error: '' })
		if (email == "") {
			this.setState({ error: 'Please enter email address' })
		} else if (password == "") {
			this.setState({ error: 'Please enter password' })
		} else if (!this.isEmailValid(email)) {
			this.setState({ error: 'Please use valid email address' })
		} else {
			this.setState({ error: '', loading: true });

			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(this.onLoginSuccess.bind(this))
				.catch(() => {
					this.onLoginFail()
				})
		}
	}

	onLoginFail() {
		//single line code below should move to onLoginSuccess
		//{this.props.navigation.navigate('InventoriesList')}

		this.setState({ error: 'Authentication Failed', loading: false });
	}
	onLoginSuccess() {
		{ this.props.navigation.replace('InventoriesList') }
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: ''
		});

	}

	isEmailValid(email) {

		if (email.match(/.+@.+/)) {
			return true;
		}
		return false;
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log in
		  </Button>
		);
	}

	render() {

		return (

			<Card>

				<CardSection>
					<Input
						label="Email"
						placeholder="Email"
						value={this.state.email}
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
					{this.renderButton()}
				</CardSection>


				<CardSection>
					<Button onPress={() => this.props.navigation.navigate('Signup')}>
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

export default LoginForm;