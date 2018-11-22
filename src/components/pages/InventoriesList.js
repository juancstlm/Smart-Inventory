// imports
import React from "react";
import InventoryProfile from "../ui/InventoryProfile";
import InventoryCardSection from "../ui/InventoryCardSection";
import { Header, SearchBar, Avatar } from "react-native-elements";
import Firebase from "../../Firebase";
import {
  Text,
  TextInput,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import Join from "../ui/Join";
import Create from "../ui/Create";

export default class InventoriesList extends React.Component {
  state = {
    inventories: [],
    childData: null,
    isModalVisible: false,
    isJoin: true,
    joinBackColor: "#2f3a49",
    createBackColor: "",
    search: "",
  };

  // This is so that react navigator hides the stack header
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    // Get inventories owned by the user
    var inventories = Firebase.firestore.collection("Inventories");
    var querry = inventories.where(
      "owner_id",
      "==",
      Firebase.auth.currentUser.uid
    );
    querry
      .get()
      .then(snapshot => {
        const invs = snapshot.docs.map(doc => {
          return doc.data();
        });
        this.setState({ inventories: invs });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    // Get Inventories shared to the user
    Firebase.firestore.collection('Inventories').where(
      'users',
      'array-contains',
      Firebase.auth.currentUser.uid,
    ).get().then(snapshot => {
      const sharedInvs = snapshot.docs.map(doc=>{
        return doc.data()
      })
      this.setState({
        inventories: [...this.state.inventories, ...sharedInvs]
      })
      console.log('SHared inv',this.state.inventories)
      }
    )
  }

  profileCallback = dataFromChild => {
    const { navigate } = this.props.navigation;
    //this.setState({childData: dataFromChild});
    {
      navigate("InventoryDetail", { inventory: dataFromChild });
    }
  };
  // renderInventories() {
  //   return this.state.inventories.data.map(inventory => (
  //     <View style={styles.profileContainer}>
  //       <InventoryProfile
  //         key={inventory.name}
  //         inventory={inventory}
  //         callbackFromParent={this.profileCallback}
  //       />
  //     </View>
  //   ));
  // }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  join = () => {
    this.setState({ isJoin: true });
    this.setState({ joinBackColor: "" });
    this.setState({ createBackColor: "#2f3a49" });
  };
  create = () => {
    this.setState({ isJoin: false });
    this.setState({ createBackColor: "" });
    this.setState({ joinBackColor: "#2f3a49" });
  };

  renderSearchBar() {
    return <SearchBar placeholder={"Type inventory name to search"}
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

  goToProfile = () => {
    this.props.navigation.navigate("Profile");
  };

  renderInventories() {
    if (this.state.search != undefined || this.state.search != "") {
    
      var text = this.state.search
      var results = []
      for (i = 0; i < this.state.inventories.length; i++) {
        if (this.state.inventories[i].name.toLowerCase().includes(text.toLowerCase())) {
          console.log(this.state.inventories[i].name.toLowerCase().includes(text.toLowerCase()))
          results.push(this.state.inventories[i])
        }
      }
      return results.map(inventory =>
        <InventoryProfile key={inventory.name} inventory={inventory} />
      );
    } else {
      return this.state.inventories.map(inventory =>
        <InventoryProfile key={inventory.name} inventory={inventory} />
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2f3a49" }}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={
            this.renderSearchBar()
          }
          rightComponent={
            <Avatar rounded title="MT" onPress={this.goToProfile} />
          }
          centerContainerStyle={{ width: "100%" }}
          containerStyle={{
            backgroundColor: "#2f3a49",
            borderBottomColor: "#2f3a49",
            justifyContent: "space-around"
          }}
        />
        <InventoryCardSection>
          <Text style={styles.textStyle}>Inventories</Text>
        </InventoryCardSection>
        <ScrollView style={{ backgroundColor: "transparent" }}>
          {this.renderInventories()}
        </ScrollView>
        <Modal
          isVisible={this.state.isModalVisible}
          avoidKeyboard={true}
          style={{
            width: "100%",
            height: "50%",
            marginTop: 20,
            marginLeft: 0,
            flex: 1
          }}
          supportedOrientations={["portrait", "landscape"]}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <View style={{ width: "100%", height: "40%", marginTop: 0 }}>
            <TouchableOpacity
              style={{
                opacity: 0.1,
                backgroundColor: "white",
                width: "100%",
                height: "100%"
              }}
              onPress={this._toggleModal}
            />
          </View>

          <View
            style={{
              flex: 1,
              width: "100%",
              height: "60%",
              backgroundColor: "#2f3a49",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: 3,
                width: "100%",
                backgroundColor: "#f7931e",
                marginBottom: 3
              }}
            />
            <InventoryCardSection>
              <TouchableOpacity
                onPress={this.join}
                style={{
                  backgroundColor: this.state.joinBackColor,
                  width: "25%",
                  justifyContent: "center",
                  marginLeft: 20,
                  marginRight: 20
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Join</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.create}
                style={{
                  backgroundColor: this.state.createBackColor,
                  width: "25%",
                  justifyContent: "center",
                  marginLeft: 20,
                  marginRight: 20
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Create</Text>
              </TouchableOpacity>
            </InventoryCardSection>
            <TextInput
              style={{
                color: "white",
                height: 40,
                width: "80%",
                backgroundColor: "#8190a5",
                borderWidth: 1
              }}
              value={"Quick Share Code"}
            />

            {this.state.isJoin ? <Join /> : <Create />}
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 40,
    marginLeft: 10,
    color: "#fff",
    backgroundColor: "transparent"
  },
  profileContainer: {
    margin: 10
  },
  actionButtonIcon: {
    fontSize: 28,
    height: 30,
    color: "white"
  }
};
