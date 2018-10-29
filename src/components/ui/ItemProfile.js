import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import InventoryCard from './InventoryCard';
import InventoryCardSection from './InventoryCardSection';
import InventoryButton from './InventoriesButton';

const InventoryItem = (props) => {

    /*callParent = () => {
        props.callbackFromParent(props.item);
    }*/

    return (
        <InventoryCard image = {props.item.image}>
            <InventoryCardSection >
                <View style={{flex: 1, height: 100, backgroundColor: '00000000'}}/>
            </InventoryCardSection>

            <InventoryCardSection>
                <InventoryButton onPress={console.log('this.callParent')}>
                    <Text style={styles.headerTextStyle}>{props.item.name}{'\n'}</Text>
                    <Text>{props.item.quantity} {' items'}</Text>
                </InventoryButton>
            </InventoryCardSection>

        </InventoryCard>
    );

};

const styles= {
   
    headerContentStyle:{
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    headerTextStyle:{
        fontSize: 20,
    },
};

export default InventoryItem;
