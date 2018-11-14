import React from "react";
import { View, ImageBackground } from "react-native";

export const InventoryCard = props => {
  console.log('invnetoruy card', props)

  return (
    <ImageBackground
      source={{uri: props.image }}
      imageStyle={{ resizeMode: "stretch", borderRadius: 6 }}
      style={styles.background}
    >
      <View style={styles.container}>{props.children}</View>
    </ImageBackground>
  );
};

const styles = {
  background: {
    flex: 1,
    resizeMode: "strech",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 6
  },
  container: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-start"
  }
};

export default InventoryCard;
