// imports
import React, { Component } from "react";
import { Text, ScrollView, SafeAreaView, View } from "react-native";
import InventoryProfile from "../ui/InventoryProfile";
import AddButton from "../ui/AddButton";
import InventoryCardSection from "../ui/InventoryCardSection";
import { Header, SearchBar } from "react-native-elements";
import Firebase from '../../Firebase'

//make componet
export default class InventoriesList extends Component {
  state = { inventories: [] };

  // This is so that react navigator hides the stack header
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.setState({
      inventories: []
    });

    var inventories = Firebase.firestore.collection('Inventories')
    var querry = inventories.where('owner_id', '==', '2T31JnJW4kTaxeomSAZs4xhixrM2')
    querry.get().then((snapshot) => {
      const invs = snapshot.docs.map(doc => {
        console.log('doc data', doc.data())
        return doc.data()})
      console.log('invs', invs)
      this.setState({inventories: invs})
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

  }

  renderInventories() {
    return this.state.inventories.map(inventory => (
      <InventoryProfile key={inventory.name} inventory={inventory} />
    ));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#2f3a49' }}>
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
  actionButtonIcon: {
    fontSize: 28,
    height: 30,
    color: "white"
  }
};
// make components available for App
