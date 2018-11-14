// imports
import React, {Component} from 'react';
import {Text, ScrollView, View, Image} from 'react-native';
import ItemProfile from '../ui/ItemProfile';
import {Header} from '../ui/Header';
import InventoryCardSection from '../ui/InventoryCardSection';


//make componet
export default class InventoryDetail extends Component {
    state = {inventory: null};

    componentWillMount(){
        // inventoryData = this.props.navigation.getParam('inventory', "No Data");
        console.log('Details screen..............');
        this.setState({ inventory: inventoryData }, () => {
         console.log(this.state.inventory);
       });
    }
   

    renderItems(){
        return this.state.inventory.items.map(item => 
            <View style={styles.profileContainer}>
                <ItemProfile style={styles.profile} key={item.name} item={item}/>
            </View>
        );
    }

    renderUserProfileImages(){
        return this.state.inventory.users.map(user => 
            <View style={styles.thumbnailContainerStyle}>
                <Image style={styles.thumbnailStyle} source={{uri: user.profileImage}} />
            </View>
        );
    }

    render() {
        return (

            <View style={{flex: 1}}>
                <InventoryCardSection>
                    <Text style={styles.textStyle}>
                        {this.state.inventory.name + ' Inventory'}
                    </Text>
                </InventoryCardSection>

                <InventoryCardSection style={{backgroundColor: '#fff'}}>
                    {this.renderUserProfileImages()}
                </InventoryCardSection>
                
                <ScrollView contentContainerStyle={styles.container}>
                    {this.renderItems()}
                </ScrollView>
            
            </View>
        );
    }
}

const styles={
    textStyle: {
        fontSize: 40,
        marginLeft: 10,
    },
    actionButtonIcon: {
        fontSize: 28,
        height: 30,
        color: 'white',
      },
    container:{
     flexDirection: 'row',
     flexWrap: 'wrap',
     padding: 5,
        
    },

    thumbnailContainerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    thumbnailStyle:{
        height: 50,
        width: 50,
        borderRadius: 20,
    },
    profileContainer:{
        width: '50%',
        margin: 5,
        flex: 1,
    },
    profile:{
        flex: 1,
        height: 200,
    },
};


