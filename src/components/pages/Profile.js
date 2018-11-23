import React from "react";
import Firebase from "../../Firebase";
import { SafeAreaView, View } from "react-native";
import { Header, Icon, Avatar, Text } from "react-native-elements";
import {connect} from 'react-redux'

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Profile',
    headerRight: <Icon name="exit-to-app" color="#fff" />,
    headerStyle:{backgroundColor: '#2f3a49'},
    header: null,
    headerTransparent: true,
  };

  logOut = () => {
    // TODO CLEAR THE DATA FROM REDUX
    Firebase.auth.signOut();
  };

  render() {
    const props = this.props
    return (
      <SafeAreaView style={{backgroundColor: '#2f3a49'}}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          containerStyle={{
            backgroundColor: "#2f3a49",
            borderBottomColor: "#2f3a49",
            justifyContent: "space-around"
          }}
          leftComponent={<Icon name='arrow-back' color='#fff'
                               onPress={()=>this.props.navigation.goBack()}/>}
          rightComponent={
            <Icon name="exit-to-app" color="#fff" onPress={this.logOut} />
          }
        />
        <View style={{justifyContent: 'center', alignItems: 'center', height:'100%'}}>
          <Avatar size="large"
                  title={String(props.firstName).charAt(0) + String(props.lastName).charAt(0)}
                  rounded
                  source={props.image !== '' ? {uri: props.image} : null}
                  />
          <Text h1 style={{color:'#fff'}}
          >{`${props.firstName} ${props.lastName}`}</Text>
          <Text h4 style={{color: '#fff'}}>{props.email}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(state=> state.user)(Profile)

const styles={
  buttonStyle:{
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 6,
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
};
