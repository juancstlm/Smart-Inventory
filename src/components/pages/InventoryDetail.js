// imports
import React from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import ItemProfile from '../ui/ItemProfile';
import { Header, SearchBar, Avatar, Icon } from "react-native-elements";
import InventoryCardSection from '../ui/InventoryCardSection';
import Firebase from "../../Firebase";
import {connect} from 'react-redux'
import {getActiveInventoryItems, getActiveInventoryUsers} from '../../redux/actions/App'

//make componet
class InventoryDetail extends React.Component {

    constructor(props){
        super(props)
      this.props.dispatch(getActiveInventoryItems())
    }

    state = {
        search: "",
        users: [],
    };

    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        const inv = this.props.inventories.activeInventory
        users = []

        inv.users.map(user => {

            Firebase.firestore.collection("Users").doc(user).get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        users.push(doc.data())
                        this.setState({ users: users });
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });

        })
    }

    renderItems() {
        if(this.props.inventories.currentItemsDetails.length > 0){
          if (this.state.search !== "" || this.state.search !== undefined) {
            var text = this.state.search
            var results = []
            this.props.inventories.currentItemsDetails.map(item => {
                if (item.name.toLowerCase().includes(text.toLowerCase())) {
                  results.push(item)
                }
              }
            );
            return results.map(item =>
              <View style={styles.profileContainer} key={item.name}>
                <ItemProfile style={styles.profile} key={item.name} item={item} />
              </View>
            );
          } else {
            return this.props.inventories.currentItemsDetails.map(item =>
              <View style={styles.profileContainer} key={item.name}>
                <ItemProfile style={styles.profile} key={item.name} item={item}/>
              </View>
            );
          }
        }
    }

    renderUserProfileImages() {
        return this.state.users.map(user => {
            if (user.image != undefined) {
                return <View style={styles.thumbnailContainerStyle} key={user.firstName}>
                    <Avatar rounded source={{ uri: user.image }} />
                </View>
            } else {
                return <View style={styles.thumbnailContainerStyle} key={user.firstName}>
                    <Avatar rounded title={user.firstName.charAt(0) + user.lastName.charAt(0)} />
                </View>
            }
        });
    }

    renderSearchBar() {
        return <SearchBar placeholder={"Type item name to search"}
            value={this.state.search}
            onChangeText={text => this.setState({ search: text })}
            autoCapitalize='none'
            containerStyle={{
                width: "120%",
                backgroundColor: "transparent",
                borderTopColor: "transparent",
                borderBottomColor: "transparent"
            }}
            inputContainerStyle={{
                backgroundColor: "#47576E",
                borderColor: "#47576E",
                borderWidth: 1
            }}
            inputStyle={{ backgroundColor: "transparent" }}
            placeholder="Search" />;
    }

    renderProfileIcon() {
        if (this.props.user == "") {
            return <Avatar rounded onPress={this.goToProfile}
                           source={{uri: this.props.user.image}}
            />
        } else {
            return <Avatar rounded source={{uri: this.props.user.image}} title={this.props.user.firstName.charAt(0) + this.props.user.lastName.charAt(0)} onPress={this.goToProfile} />
        }
    }

    goToProfile = () => {
        this.props.navigation.navigate("Profile");
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#2f3a49" }}>
                <Header
                    statusBarProps={{ barStyle: "light-content" }}
                    leftComponent={<Icon name='arrow-back' color='#fff'
                                         onPress={()=>this.props.navigation.goBack()}/>}
                    centerComponent={
                        this.renderSearchBar()
                    }
                    rightComponent={
                        this.renderProfileIcon()
                    }
                    centerContainerStyle={{ width: "100%" }}
                    containerStyle={{
                        backgroundColor: "#2f3a49",
                        borderBottomColor: "#2f3a49",
                        justifyContent: "space-around"
                    }}
                />

                <InventoryCardSection>
                    <Text style={styles.textStyle}>
                        {this.props.inventories.activeInventory.name + ' Inventory'}
                    </Text>
                </InventoryCardSection>

                <InventoryCardSection style={{ backgroundColor: '#fff' }}>
                    {this.renderUserProfileImages()}
                </InventoryCardSection>

                <ScrollView contentContainerStyle={styles.container}>
                    {this.renderItems()}
                </ScrollView>

            </View>
        );
    }
}

export default connect(state=>state)(InventoryDetail)

const styles = {
    textStyle: {
        fontSize: 40,
        marginLeft: 10,
        color: "#fff",
        backgroundColor: "transparent"
    },
    actionButtonIcon: {
        fontSize: 28,
        height: 30,
        color: 'white',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,

    },

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    thumbnailStyle: {
        height: 50,
        width: 50,
        borderRadius: 20,
    },
    profileContainer: {
        width: '50%',
        margin: 5,
        flex: 1,
    },
    profile: {
        flex: 1,
        height: 200,
    },
};


