import React from "react";
import Firebase from "../../Firebase";
import { SafeAreaView, View } from "react-native";
import { Header, Icon, Avatar, Text } from "react-native-elements";

export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      image:'',
      firstName: 'Jdjn',
      LastName: 'Djji',
      email: '',
    }
  }

  async componentDidMount() {
    await this.getUserData()
  }

  static navigationOptions = {
    title: 'Profile',
    headerRight: <Icon name="exit-to-app" color="#fff" />,
    headerStyle:{backgroundColor: '#2f3a49'},
    header: null,
    headerTransparent: true,
  };

  getUserData = async () => {
    await Firebase.firestore.collection("Users")
      .doc(Firebase.auth.currentUser.uid).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          this.setState({
            image: doc.data().image,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email
          })
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  componentWillMount() {
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
                  title={String(this.state.firstName).charAt(0) + String(this.state.lastName).charAt(0)}
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
