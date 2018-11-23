import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import {Avatar} from 'react-native-elements'
import InventoryCard from './InventoryCard';
import InventoryCardSection from './InventoryCardSection';
import InventoryButton from './InventoriesButton';

const InventoryProfile = (props) => {

    callParent = () => {
        props.callbackFromParent(props.inventory);
    }

    // renderUserProfileImages = () => {
    //     return props.inventory.users.map(user =>
    //         <View style={styles.thumbnailContainerStyle}>
    //             <Image style={styles.thumbnailStyle} source={{uri: user.profileImage}} />
    //         </View>
    //     );
    // }

  console.log('Inventory profile', props)

    return (
        <InventoryCard image={props.inventory.image} style={styles.imageStyle}>

            <InventoryCardSection>
              <Avatar
                size="small"
                rounded
                source={{uri: props.inventory.thumbnail_image}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
                {/*<View style = {styles.thumbnailContainerStyle} >*/}
                    {/*<Image style={styles.thumbnailStyle} source={{uri: props.inventory.thumbnail_image}} />*/}
                {/*</View>*/}
            </InventoryCardSection>

            <InventoryCardSection>
                <View style={{flex: 2, height: 50, backgroundColor: '00000000', blurRadius: 1}}/>
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
        borderRadius: 6,
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
