// imports
import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import InventoryProfile from "../ui/InventoryProfile";
import AddButton from "../ui/AddButton";
import InventoryCardSection from "../ui/InventoryCardSection";
import { Header, SearchBar } from "react-native-elements";

//make componet
export default class InventoriesList extends Component {
  state = { inventories: [] };

  // This is so that react navigator hides the stack header
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.setState({
      inventories: {
        data: [
          {
            name: "Home",
            itemCount: "101",
            url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6",
            image: "https://www.gstatic.com/webp/gallery/1.png",
            thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"
          },
          {
            name: "Default",
            itemCount: "50",
            url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6",
            image: "https://www.gstatic.com/webp/gallery/4.jpg",
            thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"
          },
          {
            name: "office",
            itemCount: "101",
            url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6",
            image: "https://www.gstatic.com/webp/gallery/1.png",
            thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"
          },
          {
            name: "storage",
            itemCount: "50",
            url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6",
            image: "https://www.gstatic.com/webp/gallery/4.jpg",
            thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"
          }
        ]
      }
    });
  }

  renderInventories() {
    //console.log(this.state.inventories);
    return this.state.inventories.data.map(inventory => (
      <InventoryProfile key={inventory.name} inventory={inventory} />
    ));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={
            <SearchBar
              containerStyle={{
                width: "120%",
                backgroundColor: "transparent",
                borderTopColor: "transparent",
                borderBottomColor: "transparent",
              }}
              inputContainerStyle={{
                backgroundColor:'#47576E',
                borderColor: '#47576E',
                borderWidth: 1,
              }}
              inputStyle={{backgroundColor: 'transparent'}}
              // onChangeText={someMethod}
              // onClear={someMethod}
              placeholder="Search"
            />
          }
          centerContainerStyle={{ width: "100%" }}
          containerStyle={{
            backgroundColor: "#2f3a49",
            justifyContent: "space-around"
          }}
        />
        <InventoryCardSection>
          <Text style={styles.textStyle}>Inventories</Text>
        </InventoryCardSection>
        <ScrollView>{this.renderInventories()}</ScrollView>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 40,
    marginLeft: 10
  },
  actionButtonIcon: {
    fontSize: 28,
    height: 30,
    color: "white"
  }
};
// make components available for App
