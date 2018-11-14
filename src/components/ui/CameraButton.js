import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const CameraButton= (props) => {

    return (
      <View style={styles.container}>
        <TouchableOpacity 
        style={styles.button} 
        onPress={props.onPress}
        >
          <Image 
            source={require("../../img/camera-button.png")}
            style={{
            width: 75,
            height: 75,
            overflow: "visible",
            marginTop: 2,
            marginBottom: 2
          }}
          />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    width: 75,
    height: 75,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 75
  },
  button: {
    width: 75,
    height: 75
  },
});
export default CameraButton;