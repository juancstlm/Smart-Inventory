// imports
import React from 'react';
import { Text, ScrollView, View, Image, FlatList, SafeAreaView, } from 'react-native';
import ItemProfile from '../ui/ItemProfile';
import { Header, SearchBar, Avatar, Icon, } from "react-native-elements";
import InventoryCardSection from '../ui/InventoryCardSection';
import Firebase from "../../Firebase";
import { connect } from 'react-redux'
import { getActiveInventoryItems, clearActiveInventory } from '../../redux/actions/App'
import { Clipboard, Alert, Keyboard } from 'react-native';
import ActionButton from 'react-native-action-button'
import Modal from "react-native-modal";

//make componet
class InventoryDetail extends React.Component {

    constructor(props) {
        super(props)
        this.props.dispatch(getActiveInventoryItems())
    }

    state = {
        search: "",
        users: [],
        searchFlag: false,
        isModalVisible: false,
    };

    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        this.setState({
            searchFlag: false
        })
        Keyboard.dismiss
    }

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

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });


    renderItems() {
        if (this.props.inventories.currentItemsDetails.length > 0) {
            if (this.state.search !== "" || this.state.search !== undefined) {
                var text = this.state.search
                var results = []
                this.props.inventories.currentItemsDetails.map(item => {
                    if (item.name.toLowerCase().includes(text.toLowerCase())) {
                        results.push(item)
                    }
                }
                );
                return <FlatList contentContainerStyle={styles.container}
                                 data={results}
                                 numColumns={2}
                                 keyExtractor={this.keyExtractor}
                                 ListEmptyComponent={<Text>No Items Matched</Text>}
                                 renderItem={({ item }) =>
                                   <View style={styles.profileContainer} key={item.id}>
                                     <ItemProfile style={styles.profile} key={item.id} item={item} />
                                   </View>}
                >
                </FlatList>
            } else {
                return <FlatList contentContainerStyle={styles.container}
                                 data={this.props.inventories.currentItemsDetails}
                                 numColumns={2}
                                 keyExtractor={this.keyExtractor}
                                 renderItem={({ item }) =>
                                   <View style={styles.profileContainer} key={item.id}>
                                     <ItemProfile style={styles.profile} key={item.id} item={item} />
                                   </View>}
                >
                </FlatList>
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

    keyExtractor(item, index) {
        return item.id
    }

    invite() {
        Alert.alert(
            "Invitation Code",
            this.props.inventories.activeInventory.invite_id,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Copy', onPress: () => Clipboard.setString(this.props.inventories.activeInventory.invite_id) },
            ],
            { cancelable: false }
        )

    }

    renderSearchBar() {
        return <SearchBar placeholder={"Type item name to search"}
            autoFocus={this.state.searchFlag}
            value={this.state.search}
            onChangeText={text =>
                this.setState({
                    search: text,
                    searchFlag: true,
                })}
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
                source={{ uri: this.props.user.image }}
            />
        } else {
            return <Avatar rounded source={{ uri: this.props.user.image }} title={this.props.user.firstName.charAt(0) + this.props.user.lastName.charAt(0)} onPress={this.goToProfile} />
        }
    }

    handleGoBack = () => {
        this.props.dispatch(clearActiveInventory())
        this.props.navigation.goBack()
    }

    goToProfile = () => {
        this.props.navigation.navigate("Profile");
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#2f3a49" }} onPress={Keyboard.dismiss}>
                <Header
                    statusBarProps={{ barStyle: "light-content" }}
                    leftComponent={<Icon name='arrow-back' color='#fff'
                        onPress={this.handleGoBack} />}
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
                        {this.props.inventories.activeInventory.name}
                    </Text>
                </InventoryCardSection>

                <InventoryCardSection style={{ backgroundColor: '#fff' }}>
                    {this.renderUserProfileImages()}
                    <Avatar rounded title='+' onPress={() => this.invite()} />
                </InventoryCardSection>
              {this.renderItems()}
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => (this.props.navigation.navigate("CameraClarifai"))} />

            </SafeAreaView>
        );
    }
}

export default connect(state => state)(InventoryDetail)

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
        padding: 5,

    },

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
    },
    thumbnailStyle: {
        height: 50,
        width: 50,
        borderRadius: 20,
    },
    profileContainer: {
        margin: 5,
        flex: 1,
    },
    profile: {
        flex: 1,
        height: 200,
    },
};


