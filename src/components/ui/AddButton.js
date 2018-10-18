import React from 'react';
import {Text, TouchableOpacity} from 'react-native';


const AddButton= (props) => {

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
        alignSelf: 'flex-end',
        backgroundColor: '#e1e9f7',
        opacity: .9,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginLeft: 60,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 5,
    },

    textStyle:{
        flex: 1,
        alignSelf: 'center',
        color: '#000',
        fontSize: 35,
        fontWeight: '600',
        paddingTop: 0,
        paddingBottom: 0

    }

};

export default AddButton;