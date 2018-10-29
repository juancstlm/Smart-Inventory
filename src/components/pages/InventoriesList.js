// imports
import React, {Component} from 'react';
import {Text, ScrollView, View} from 'react-native';
import InventoryProfile from '../ui/InventoryProfile';
import {Header} from '../ui/Header';
import SearchBar from 'react-native-search-bar';
import InventoryCardSection from '../ui/InventoryCardSection';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';


export default class InventoriesList extends Component {
    state = {inventories: [], childData: null};

    componentWillMount(){
        console.log('InventoriesList mounting....');
      //  console.log(this.data);
        this.setState({inventories: {
            "data":[
                {name: "Home", itemCount: "101", image: "https://www.gstatic.com/webp/gallery/3.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg",
                items:[
                    {name: "banana", quantity: 12, image:'https://www.gstatic.com/webp/gallery/3.png'},
                    {name: "orange", quantity: 10, image:'https://www.gstatic.com/webp/gallery/4.png'}
                    ],
                users:[
                    {name: "helen", userType: "regular", profileImage:'https://www.gstatic.com/webp/gallery/4.png'},
                    {name: "someone", userType: "admin", profileImage:'https://www.gstatic.com/webp/gallery/1.png'}
                    ]}, 
        
                {name: "Office", itemCount: "15", image: "https://www.gstatic.com/webp/gallery/2.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg",
                items:[
                    {name: "bannana", quantity: 2, image:'https://www.gstatic.com/webp/gallery/1.png'},
                    {name: "orange", quantity: 10, image:'https://www.gstatic.com/webp/gallery/2.png'}
                    ],
                users:[
                    {name: "helen", userType: "regular", profileImage:'https://www.gstatic.com/webp/gallery/3.png'},
                    {name: "abraham", userType: "admin", profileImage:'https://www.gstatic.com/webp/gallery/5.png'}
                    ]},]
        
        }}); 
       /* {"data":[
            {name: "Home", itemCount: "101", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/1.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"}, 
            {name: "Default", itemCount: "50", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/3.jpg", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"},
            {name: "office", itemCount: "101", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/2.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"}, 
            {name: "storage", itemCount: "50", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/4.jpg", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"},
        ]
        }});*/
        console.log(this.inventories);
    }

    profileCallback = (dataFromChild) => {
        const {navigate} = this.props.navigation;
        //this.setState({childData: dataFromChild});
        {navigate('InventoryDetail',{inventory: dataFromChild})};
    }

    renderInventories(){
        
        return this.state.inventories.data.map(inventory => 
            <View style={styles.profileContainer}>
                <InventoryProfile key={inventory.name} inventory={inventory} 
                callbackFromParent={this.profileCallback} />
            </View>
        );
    }

    renderSearchBar(){
        return <SearchBar placeholder={'Type inventory name to search'} />;
    }

    render() {
        return (

            <View style={{flex: 1}}>
                <InventoryCardSection>
                    <Text style={styles.textStyle}>
                        Inventories
                    </Text>
                    
                </InventoryCardSection>
                <View>
                    {this.renderSearchBar()}
                </View>
                <ScrollView>
                    {this.renderInventories()}
                </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Inventory" onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

const styles={
    textStyle: {
        fontSize: 40,
        marginLeft: 10,
    },
    profileContainer: {
        margin: 10,
    },
    actionButtonIcon: {
        fontSize: 28,
        height: 30,
        color: 'white',
      },
};


