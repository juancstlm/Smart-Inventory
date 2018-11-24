import React from "react";
import { Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import InventoryCard from "./InventoryCard";
import InventoryCardSection from "./InventoryCardSection";
import InventoryButton from "./InventoriesButton";
import store from '../../redux/store'
import NavigationService from '../../../NavigationService'
import {setActiveItem} from '../../redux/actions/App'

const InventoryItem = props => {
  /*callParent = () => {
        props.callbackFromParent(props.item);
    }*/

  var getWidth = function() {
    var width = "";
    width += props.item.quantity;
    width += "%";
    return width;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#8190a5",
        borderRadius: 10,
        overflow: "hidden"
      }}
    >
      <View style={{
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 0,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',}}>
        <View style={{
          backgroundColor: "#f7931e",
          borderBottomEndRadius: 6,
          borderTopRightRadius: 6,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 1.0
        }}>
          <Text style={styles.headerTextStyle}>{props.item.quantity}</Text>
        </View>
          <Text style={styles.itemNameStyle}>{props.item.name}</Text>
      </View>

      <ImageBackground
        source={{uri: props.item.image }}
        imageStyle={{ resizeMode: "cover", width:'100%' }}
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            store.dispatch(setActiveItem(props.item));
            NavigationService.navigate('Item')
          }}
          style={styles.buttonStyle}
        />
      </ImageBackground>
    </View>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around"
  },

  headerTextStyle: {
    fontSize: 20,
    margin: 3,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#FFF"
  },
  itemNameStyle: {
    fontSize: 16,
    marginLeft: 6,
    color: '#fff'
  },
  buttonStyle: {
    flex: 1,
    height: 130,
    alignSelf: "stretch",
    backgroundColor: "#e1e9f7",
    opacity: 0.1,
    borderWidth: 0
  }
};

export default InventoryItem;
