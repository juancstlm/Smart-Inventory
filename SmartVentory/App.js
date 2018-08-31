import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Image source={require('./images/logo.png')} style={{width: 200, height: 200}} />
          <Text style={styles.welcome_title}>Welcome to SmartVentory</Text>
          <Text style={styles.welcome_subtitle}>The best way to keep track of your items. Let's get started!</Text>
          <Text style={styles.welcome_subtitle}>Continue with:</Text>
          <Button
              onPress={() => {
                  Alert.alert('You tapped the button!');
              }}
              title="Press Me"
          />
      </View>

    );
  }
}

const styles = StyleSheet.create({
    welcome_title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 44,

    },
    welcome_subtitle: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    container: {
        flex: 1,
        backgroundColor: '#2F3A49',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
