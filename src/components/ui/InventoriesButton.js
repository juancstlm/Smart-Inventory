import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';


const InventoryButton= (props) => {

    return (
      <BlurView blurType="light" style={styles.buttonStyle} blurAmount={10}>
        <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.textStyle}>
              {props.children}
            </Text>
        </TouchableOpacity>
        </BlurView>
    );
};

const styles={

    buttonStyle:{
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 6,
        marginLeft: 5,
        marginRight: 5,
      paddingRight: 5,
      paddingLeft: 5,
    },

    textStyle:{
        alignSelf: 'flex-start',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5

    }

};

export default InventoryButton;