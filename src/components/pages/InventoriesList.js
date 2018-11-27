// imports
import React from "react";
import InventoryProfile from "../ui/InventoryProfile";
import InventoryCardSection from "../ui/InventoryCardSection";
import { Header, SearchBar, Avatar,} from "react-native-elements";
import { Keyboard} from "react-native"
import Firebase from "../../Firebase";
import {
  Text,
  TextInput,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from "react-native";
import Modal from "react-native-modal";
import Join from "../ui/Join";
import Create from "../ui/Create";
import ActionButton from 'react-native-action-button'
import { connect } from 'react-redux'

class InventoriesList extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    childData: null,
    isModalVisible: false,
    isJoin: true,
    joinBackColor: "#2f3a49",
    createBackColor: "",
    search: "",
    searchFlag: false,
  };

  // This is so that react navigator hides the stack header
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.setState({
      searchFlag:false
    })
    Keyboard.dismiss
  }
  profileCallback = dataFromChild => {
    const { navigate } = this.props.navigation;
    //this.setState({childData: dataFromChild});
    {
      navigate("InventoryDetail", { inventory: dataFromChild });
    }
  };

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
      autoFocus={this.state.searchFlag}
      value={this.state.search}
      onChangeText={text => this.setState({ search: text, searchFlag: true })}
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
    if (this.state.search !== undefined || this.state.search !== "") {
      var text = this.state.search
      var results = []
      this.props.inventories.all.map(inv => {
        if (inv.name.toLowerCase().includes(text.toLowerCase())) {
          results.push(inv)
        }
      });
      return <FlatList
        data={results}
        numColumns={1}
        extraData={this.props.inventories.all}
        refreshing={this.props.inventories.refreshing}
        keyExtractor={this.keyExtractor}
        onRefresh={this.handleRefresh}
        initialNumToRender={4}
        ListEmptyComponent={<Text>No Inventories</Text>}
        renderItem={({item}) => <InventoryProfile key={item.id} inventory={item}/>}
      >
      </FlatList>
    } else {
      return <FlatList
        data={this.props.inventories.all}
        numColumns={1}
        extraData={this.props.inventories.all}
        refreshing={this.props.inventories.refreshing}
        keyExtractor={this.keyExtractor}
        onRefresh={this.handleRefresh}
        initialNumToRender={4}
        ListEmptyComponent={<Text>Loading</Text>}
        renderItem={({item}) => <InventoryProfile key={item.id} inventory={item}/>}
      >
      </FlatList>
    }
  }

  renderProfileIcon() {
    if (this.props.user.firstName == "") {
      return <Avatar rounded onPress={this.goToProfile} source={{ uri: this.props.user.image }} />
    } else {
      return <Avatar rounded source={{ uri: this.props.user.image }}
        title={String(this.props.user.firstName).charAt(0) + String(this.props.user.lastName).charAt(0)}
        onPress={this.goToProfile} />
    }
  }

  handleRefresh = () =>{

  }

  keyExtractor(item, index) {
    return item.id
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2f3a49" }} onPress={Keyboard.dismiss}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
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
          <Text style={styles.textStyle}>Inventories</Text>
        </InventoryCardSection>
        {this.renderInventories()}
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={this._toggleModal}>
        </ActionButton>
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
          onBackdropPress={() => this.setState({ isVisible: false })}>
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

            {this.state.isJoin ? <Join /> : <Create inventories={this.props.inventories.all} />}
          </View>
        </Modal>

        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={this._toggleModal} />

      </SafeAreaView>
    );
  }
}

export default connect(state => state)(InventoriesList)

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
