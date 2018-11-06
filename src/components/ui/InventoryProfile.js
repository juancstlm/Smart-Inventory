import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import InventoryCard from './InventoryCard';
import InventoryCardSection from './InventoryCardSection';
import InventoryButton from './InventoriesButton';

const InventoryProfile = (props) => {

    callParent = () => {
        props.callbackFromParent(props.inventory);
    }

    renderUserProfileImages = () => {
        return props.inventory.users.map(user => 
            <View style={styles.thumbnailContainerStyle}>
                <Image style={styles.thumbnailStyle} source={{uri: user.profileImage}} />
            </View>
        );
    }

    return (
        <InventoryCard image = {props.inventory.image} style={styles.imageStyle}>

            <InventoryCardSection>
                {renderUserProfileImages()}
            </InventoryCardSection>

            <InventoryCardSection >
                <View style={{flex: 2, height: 50, backgroundColor: '000000'}}/>
            </InventoryCardSection>

            <InventoryCardSection>
                <InventoryButton onPress={this.callParent}>
                    <Text style={styles.headerTextStyle}>{props.inventory.name}{'\n'}</Text>
                    <Text>{props.inventory.itemCount} {' items'}</Text>
                </InventoryButton>
            </InventoryCardSection>

        </InventoryCard>
    );

};

const styles= {
    //for the view tag containing the title and artist name
    headerContentStyle:{
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    //for Album title 
    headerTextStyle:{
        fontSize: 25,
    },
    //for the image tag
    thumbnailStyle:{
        height: 50,
        width: 50,
        borderRadius: 20,
    },

    //for the view tag containing the image tag
    thumbnailContainerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },

    //For the inventory image
    imageStyle:{
        height: 300,
        flex: 1,
        margin: 10,
        width: null
    }
};

export default InventoryProfile;
