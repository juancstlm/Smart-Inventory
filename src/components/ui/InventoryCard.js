import React from 'react';
import {View, ImageBackground} from 'react-native';


const InventoryCard = (props) => {
    
    return (
        <View style={{
            backgroundColor: '#fff',
            borderRadius: 15,
            overflow: 'hidden',
          }}>
            <ImageBackground
            source={{uri: props.image}}
            imageStyle={{resizeMode: 'stretch',borderRadius: 15 }}
            style={styles.background}>
                <View style={styles.container}>
                    {props.children}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = {
    background: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'strech',
        borderRadius: 15,
    },
    container: {
        flex: 1,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 15,
    }
};

export default InventoryCard;