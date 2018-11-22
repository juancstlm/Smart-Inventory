import React from "react";
import Firebase from "../../Firebase";
import { SafeAreaView, View } from "react-native";
import { Header, Icon, Avatar, Text } from "react-native-elements";

export default class Profile extends React.Component {

  state={
    image:'',
    firstName: '',
    LastName: '',
    email: '',
  }


  static navigationOptions = {
    title: 'Profile',
    headerRight: <Icon name="exit-to-app" color="#fff" />,
    headerStyle:{backgroundColor: '#2f3a49'},
    header: null,
    headerTransparent: true,
  };

  componentWillMount() {
    // Firebase.firestore.collection('Users').doc('uid')
    var user = Firebase.firestore.collection("Users")
      .doc(Firebase.auth.currentUser.uid);
    var getDoc = user.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data().image);
          this.setState({
            image: doc.data().image,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email
          })
          console.log('State', this.state)
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  logOut = () => {
    Firebase.auth.signOut();
  };

  render() {
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
                  title={'MT'}
                  rounded
                  source={this.state.image !== '' ? {uri: this.state.image} : null}
                  />
          <Text h1 style={{color:'#fff'}}
          >{`${this.state.firstName} ${this.state.lastName}`}</Text>
          <Text h4 style={{color: '#fff'}}>{this.state.email}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

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
