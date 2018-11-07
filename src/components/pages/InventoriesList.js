// imports
import React, {Component} from 'react';
import {Text, ScrollView, View} from 'react-native';
import InventoryProfile from '../ui/InventoryProfile';
import {Container, Header, Item, Input, Icon} from 'native-base'
import AddButton from '../ui/AddButton';
import InventoryCardSection from '../ui/InventoryCardSection';
// import Icon from 'react-native-vector-icons/Ionicons';

//make componet
export default class InventoriesList extends Component {
    state = {inventories: []};

    componentWillMount(){
       this.setState({inventories: {
        "data":[
            {name: "Home", itemCount: "101", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/1.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"}, 
            {name: "Default", itemCount: "50", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/4.jpg", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"},
            {name: "office", itemCount: "101", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/1.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"}, 
            {name: "storage", itemCount: "50", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/4.jpg", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"},
        ]
        }});
    }

    renderInventories(){
        //console.log(this.state.inventories);
        return this.state.inventories.data.map(inventory => 
            <InventoryProfile key={inventory.name} inventory={inventory}/>
        );
    }

    render() {
        return (
          <Container>
            <Header searchBar rounded>
              <Item>
                {/*<Icon name="ios-search" />*/}
                <Input placeholder="Search" />
                {/*<Icon name="ios-people" />*/}
              </Item>
            </Header>
            <View style={{flex: 1}}>
              <InventoryCardSection>
                <Text style={styles.textStyle}>
                  Inventories
                </Text>

              </InventoryCardSection>
              <ScrollView>
                {this.renderInventories()}
              </ScrollView>
            </View>
          </Container>
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
};
// make components available for App

