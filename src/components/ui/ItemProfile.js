import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import InventoryCard from './InventoryCard';
import InventoryCardSection from './InventoryCardSection';
import InventoryButton from './InventoriesButton';

const InventoryItem = (props) => {

    /*callParent = () => {
        props.callbackFromParent(props.item);
    }*/

    var getWidth = function() {
        var width = '';
        width+= props.item.quantity 
        width+='%'
        return width;
    };

    return (
        <View style={{flex: 1, 
            backgroundColor: '#8190a5',
            borderRadius: 10,
            overflow: 'hidden'}}>

            <InventoryCardSection >
                <View style={{backgroundColor: '#f7931e'}}>
                    <Text style={styles.headerTextStyle}>
                        {props.item.quantity}
                    </Text>
                </View>
                <View>
                    <Text style={styles.headerTextStyle}>
                            {props.item.name}
                    </Text>
                    <View style={{width: getWidth(),height: 3,backgroundColor: '#f7931e'}}>

                    </View>
                </View>
            </InventoryCardSection>

            <InventoryCard image = {props.item.image}>
                
                <InventoryCardSection>

                    <TouchableOpacity onPress={() => console.log('this.callParent')} style={styles.buttonStyle} >
                        
                    </TouchableOpacity>

                </InventoryCardSection>

             </InventoryCard>
            
        </View>
        
    );

};

const styles= {
   
    headerContentStyle:{
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    headerTextStyle:{
        fontSize: 20,
        margin: 3,
        color: 'white',
    },
    buttonStyle:{
        flex: 1,
        height: 130,
        alignSelf: 'stretch',
        backgroundColor: '#e1e9f7',
        opacity: .1,
        borderRadius: 15,
        borderWidth: 0,
    },
};

export default InventoryItem;
