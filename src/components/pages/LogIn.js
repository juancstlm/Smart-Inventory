import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from '../ui/index';
import NavigationService from '../../../NavigationService';


class LoginForm extends Component {
	state = { email: '', password: '', error: '', loading: false };

	componentWillMount(){
		console.log("PROPS", this.props)
	}

	onButtonPress() {
		const { email, password } = this.state;
		console.log(email, password)
		this.setState({ error: '' })
		if (email === "") {
			this.setState({ error: 'Please enter email address' })
		} else if (password === "") {
			this.setState({ error: 'Please enter password' })
		} else if (!this.isEmailValid(email)) {
			this.setState({ error: 'Please use valid email address' })
		} else {
			this.setState({ error: '', loading: true });

			console.log("FIREBASE", firebase)
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(
					this.onLoginSuccess.bind(this)

				)
				.catch((e) => {
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
		NavigationService.navigate('InventoriesList');
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