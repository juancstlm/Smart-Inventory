import React from 'react';
import {Text, TouchableOpacity} from 'react-native';


const InventoryButton= (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle} >
            <Text style={styles.textStyle}>
                {props.children}
            </Text>
            

        </TouchableOpacity>
    );
};

const styles={

    buttonStyle:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#e1e9f7',
        opacity: .7,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginLeft: 5,
        marginRight: 5
    },

    textStyle:{
        alignSelf: 'flex-start',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5

    }

};

export default InventoryButton;