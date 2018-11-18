// imports
import React from "react";
import InventoryProfile from "../ui/InventoryProfile";
import InventoryCardSection from "../ui/InventoryCardSection";
import { Header, SearchBar, Avatar, ButtonGroup } from "react-native-elements";
import Firebase from "../../Firebase";
import {
  Text,
  TextInput,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import ActionButton from 'react-native-action-button';
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
    selectedIndex: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }

    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  // This is so that react navigator hides the stack header
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    this.setState({
      inventories: []
    });

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
          console.log("doc data", doc.data());
          return doc.data();
        });
        console.log("invs", invs);
        this.setState({ inventories: invs });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
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
    return <SearchBar placeholder={"Type inventory name to search"} />;
  }

  goToProfile = () => {
    this.props.navigation.navigate("Profile");
  };

  renderInventories() {
    return this.state.inventories.map(inventory =>
        <InventoryProfile key={inventory.name} inventory={inventory}/>
    );
  }


  render() {
    const buttons = ['Join', 'Create'];
    const { selectedIndex } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#2f3a49" }}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={
            <SearchBar
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
              // onChangeText={someMethod}
              // onClear={someMethod}
              placeholder="Search"
            />
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
            flex: 1,
          }}
          supportedOrientations={["portrait", "landscape"]}
          onBackdropPress={() => this.setState({ isVisible: false })}>

            <View style={{ width: "100%", height: "40%", marginTop: 0 }}>
              <TouchableOpacity
                style={{
                  opacity: 0.1,
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%"
                }}
                onPress={this._toggleModal}/>
            </View>

            <View
              style={{
                flex: 2,
                width: "100%",
                height: "60%",
                backgroundColor: "#2f3a49",
                alignItems: "center"
              }}>
              <View
                style={{
                  height: 3,
                  width: "100%",
                  backgroundColor: "#f7931e",
                  marginBottom: 3
                }}/>

                <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 35, width: "80%", borderWidth: 0, marginTop: 5}}
                innerBorderStyle={{color: '#e79100'}}
                selectedBackgroundColor={"#e79627"}
                selectedTextStyle={{color: '#fff'}}
                selectedButtonStyle={{backgroundColor: '#e79627'}}
                buttonStyle={{backgroundColor:"#2f3a49", borderWidth: 0}}
                textStyle={{color:'#fff'}} />
              
                {this.state.selectedIndex === 0 ? <Join/> : <Create/>}
                          
            </View>
        </Modal>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={this._toggleModal}>
                    
        </ActionButton>
      </View>
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
