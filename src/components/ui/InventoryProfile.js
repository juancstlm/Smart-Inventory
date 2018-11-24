import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import {Avatar} from 'react-native-elements'
import InventoryCard from './InventoryCard';
import InventoryCardSection from './InventoryCardSection';
import InventoryButton from './InventoriesButton';
import NavigationService from "../../../NavigationService";
import Firebase from '../../Firebase'
import {setActiveInventory} from '../../redux/actions/App'
import store from '../../redux/store'

export default class InventoryProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      users: [],
    }

  }

    componentDidMount(): void {
      this.getInventoryUsers();
      this.getInventoryOwner();
    }

  // callParent = () => {
    //     props.callbackFromParent(props.inventory);
    // }
    callParent = () => {
        props.callbackFromParent(props.inventory);
    }

    // renderUserProfileImages = () => {
    //     return props.inventory.users.map(user =>
    //         <View style={styles.thumbnailContainerStyle}>
    //             <Image style={styles.thumbnailStyle} source={{uri: user.profileImage}} />
    //         </View>
    //     );
    // }

  getInventoryOwner = () =>{
      Firebase.firestore.collection('Users').doc(this.props.inventory.owner_id)
        .get().then(doc => {
          const ownerData = doc.data();
          this.setState({
            users: [...this.state.users, {...ownerData,
              owner: true,
              id: this.props.inventory.owner_id}]
          })
      })
  }

  getInventoryUsers = () =>{
    this.props.inventory.users.forEach(user => {
      Firebase.firestore.collection('Users').doc(user).get()
        .then(doc => {
          var userData = doc.data()
          this.setState({
            users: [...this.state.users,
              {
                owner: false,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                id: user
              }
            ]
          })
        })
    })
  }

  renderUsers = () =>{
    return this.state.users.map(user =>
      <Avatar sise='small'
                      key={user.id}
                      rounded
                      source={{uri: user.image}}
                      title={user.firstName.substring(0,1) + user.lastName.substring(0,1)}
                      activeOpacity={0.7}
      />
    )
  }

  rennderOnwer = ()=>{
    if (this.state.owner.firstName){
      return <Avatar sise='small'
                     containerStyle={{borderWidth: 5,
                       borderColor: 'white',
                       backgroundColor: 'black'}}
                     rounded
                     source={{uri: this.state.owner.image}}
                     title={this.state.owner.firstName.substring(0,1) + this.state.lastName.substring(0,1)}
                     activeOpacity={0.7}
      />
    }
  }

  handleInventorySelect=()=>{
    store.dispatch(setActiveInventory(this.props.inventory))
    NavigationService.navigate("InventoryDetail")
  }

  render(){
    var props = this.props
    return (
      <InventoryCard image={props.inventory.image} style={styles.imageStyle}>
        <InventoryCardSection>
          {this.state.users !== [] ? this.renderUsers() : null}
        </InventoryCardSection>

        <InventoryCardSection>
          <View style={{flex: 2, height: 50, backgroundColor: '00000000', blurRadius: 1}}/>
        </InventoryCardSection>
        <InventoryCardSection>
                <InventoryButton onPress={this.handleInventorySelect}>
                    <Text style={styles.headerTextStyle}>{props.inventory.name}{'\n'}</Text>
                    <Text>{props.inventory.items.length} {' items'}</Text>
                </InventoryButton>
        </InventoryCardSection>

        </InventoryCard>
    );
  }
};

const styles= {
    //for the view tag containing the title and artist name
    headerContentStyle:{
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    //for Album title 
    headerTextStyle:{
        fontSize: 25,
    },
    //for the image tag
    thumbnailStyle:{
        height: 50,
        width: 50,
        borderRadius: 6,
    },

    //for the view tag containing the image tag
    thumbnailContainerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },

    //For the inventory image
    imageStyle:{
        height: 300,
        flex: 1,
        margin: 10,
        width: null
    }
};
