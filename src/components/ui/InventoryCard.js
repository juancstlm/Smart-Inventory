import React from 'react';
import {View, ImageBackground} from 'react-native';


export const InventoryCard = (props) => {
    return (
    
        <ImageBackground
        source={{uri: props.inventory.image}}
        imageStyle={{resizeMode: 'stretch'}}
        style={styles.background}>
            <View style={styles.container}>
                 {props.children}
             </View>
        </ImageBackground>
    );
};

const styles = {
    background: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'strech',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
    }
};

export default InventoryCard;