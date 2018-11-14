import { Input } from "react-native-elements";
import React from "react";

export const theme = {
  Button: {
    raised: true,
    buttonStyle: {
      backgroundColor: "#e79627",
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 6
    },
    loadingProps: {
      size: 'large',
      color: '#fff'
    }
  },
  Input: {
    placeholderTextColor: '#959DAD',
    inputContainerStyle: {
      backgroundColor: "#454F63",
      borderRadius: 6,
      borderColor: "transparent",
      borderBottomColor:'transparent',
      borderWidth: 0,
    },
    inputStyle: {
      color: '#fff'
    }
  }
};