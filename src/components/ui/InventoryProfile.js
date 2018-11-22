import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import {Avatar} from 'react-native-elements'
import InventoryCard from './InventoryCard';
import InventoryCardSection from './InventoryCardSection';
import InventoryButton from './InventoriesButton';
import Firebase from '../../Firebase'

export default class InventoryProfile extends React.Component {

    state={
      users: []
    }

    componentWillMount(): void {
      this.getInventoryUsers()
    }

  // callParent = () => {
    //     props.callbackFromParent(props.inventory);
    // }

    // renderUserProfileImages = () => {
    //     return props.inventory.users.map(user =>
    //         <View style={styles.thumbnailContainerStyle}>
    //             <Image style={styles.thumbnailStyle} source={{uri: user.profileImage}} />
    //         </View>
    //     );
    // }

  getInventoryUsers = () =>{
    this.props.inventory.users.forEach(user => {
      Firebase.firestore.collection('Users').doc(user).get()
        .then(doc => {
          var userData = doc.data()
          this.setState({
            users: [...this.state.users,
              {
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

  render(){
    var props = this.props
    console.log('Inventory profile', props)

    return (
      <InventoryCard image={props.inventory.image} style={styles.imageStyle}>

        <InventoryCardSection>
          {this.renderUsers()}
        </InventoryCardSection>

        <InventoryCardSection>
          <View style={{flex: 2, height: 50, backgroundColor: '00000000', blurRadius: 1}}/>
        </InventoryCardSection>

        <InventoryCardSection>
          <InventoryButton onPress={this.callParent}>
            <Text style={styles.headerTextStyle}>{props.inventory.name}{'\n'}</Text>
            <Text>{props.inventory.itemCount} {' items'}</Text>
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
