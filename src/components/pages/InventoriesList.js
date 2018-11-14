// imports
import React, { Component } from "react";
import { Text, ScrollView, SafeAreaView, View } from "react-native";
import InventoryProfile from "../ui/InventoryProfile";
import AddButton from "../ui/AddButton";
import InventoryCardSection from "../ui/InventoryCardSection";
import { Header, SearchBar, Avatar } from "react-native-elements";
import Firebase from "../../Firebase";
import React, {Component} from 'react';
import {Text,TextInput, ScrollView, View,TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import InventoryProfile from '../ui/InventoryProfile';
import Join from '../ui/Join';
import Create from '../ui/Create';
import SearchBar from 'react-native-search-bar';
import InventoryCardSection from '../ui/InventoryCardSection';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { Button } from 'native-base';



export default class InventoriesList extends Component {
  state = { inventories: [] };
    state = {inventories: [], childData: null, isModalVisible: false, 
        isJoin: true,joinBackColor: '#2f3a49', createBackColor: ''};

  // This is so that react navigator hides the stack header
  static navigationOptions = {
    header: null
  };
    componentWillMount(){
        console.log('InventoriesList mounting....');
      //  console.log(this.data);
        this.setState({inventories: {
            "data":[
                {name: "Home", itemCount: "101", image: "https://www.gstatic.com/webp/gallery/3.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg",
                items:[
                    {name: "banana", quantity: 200, image:'https://www.gstatic.com/webp/gallery/3.png'},
                    {name: "orange", quantity: 70, image:'https://www.gstatic.com/webp/gallery/4.png'}
                    ],
                users:[
                    {name: "helen", userType: "regular", profileImage:'https://www.gstatic.com/webp/gallery/4.png'},
                    {name: "someone", userType: "admin", profileImage:'https://www.gstatic.com/webp/gallery/1.png'}
                    ]}, 
        
                {name: "Office", itemCount: "15", image: "https://www.gstatic.com/webp/gallery/2.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg",
                items:[
                    {name: "bannana", quantity: 22, image:'https://www.gstatic.com/webp/gallery/1.png'},
                    {name: "orange", quantity: 50, image:'https://www.gstatic.com/webp/gallery/2.png'}
                    ],
                users:[
                    {name: "helen", userType: "regular", profileImage:'https://www.gstatic.com/webp/gallery/3.png'},
                    {name: "abraham", userType: "admin", profileImage:'https://www.gstatic.com/webp/gallery/5.png'}
                    ]},]
        
        }}); 
    }

  componentWillMount() {
    this.setState({
      inventories: []
    });
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

    var inventories = Firebase.firestore.collection("Inventories");
    var querry = inventories.where(
      "owner_id",
      "==",
      Firebase.auth.currentUser.uid
    );
    querry
      .get()
      .then(snapshot => {
        const invs = snapshot.docs.map(doc => {
          console.log("doc data", doc.data());
          return doc.data();
        });
        console.log("invs", invs);
        this.setState({ inventories: invs });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    join = () => {
        this.setState({ isJoin: true });
        this.setState({ joinBackColor: '' });
        this.setState({ createBackColor: '#2f3a49' });
      }
    create = () => {
        this.setState({ isJoin: false });
        this.setState({ createBackColor: '' });
        this.setState({ joinBackColor: '#2f3a49' });
      }

    renderSearchBar(){
        return <SearchBar placeholder={'Type inventory name to search'} />;
    }

  goToProfile =()=>{
    this.props.navigation.navigate('Profile')
  }

  renderInventories() {
    return this.state.inventories.map(inventory => (
      <InventoryProfile key={inventory.name} inventory={inventory} />
    ));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#2f3a49" }}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={
            <SearchBar
              containerStyle={{
                width: "120%",
                backgroundColor: "transparent",
                borderTopColor: "transparent",
                borderBottomColor: "transparent"
              }}
              inputContainerStyle={{
                backgroundColor: "#47576E",
                borderColor: "#47576E",
                borderWidth: 1
              }}
              inputStyle={{ backgroundColor: "transparent" }}
              // onChangeText={someMethod}
              // onClear={someMethod}
              placeholder="Search"
            />
          }
          rightComponent={
            <Avatar
              rounded
              title="MT"
              onPress={this.goToProfile}
            />
          }
          centerContainerStyle={{ width: "100%" }}
          containerStyle={{
            backgroundColor: "#2f3a49",
            borderBottomColor: "#2f3a49",
            justifyContent: "space-around"
          }}
        />
        <InventoryCardSection>
          <Text style={styles.textStyle}>Inventories</Text>
        </InventoryCardSection>
        <ScrollView style={{ backgroundColor: "transparent" }}>
          {this.renderInventories()}
        </ScrollView>
      </View>
    );
  }
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

                
                    
                    <Modal isVisible={this.state.isModalVisible}
                        avoidKeyboard={true}
                        style={{width: '100%',height: '50%', marginTop: 20,marginLeft: 0, flex: 1}}
                        supportedOrientations={['portrait', 'landscape']}
                        onBackdropPress={() => this.setState({ isVisible: false })}> 

                        <View style={{width: '100%',height: '40%', marginTop: 0}}>
                            <TouchableOpacity style={{ opacity: .1, backgroundColor: 'white', width: '100%',height: '100%'}}
                            onPress={this._toggleModal}>
                            
                            </TouchableOpacity>
                         </View>

                        <View  style={{flex: 1,width: '100%',height: '60%', backgroundColor: '#2f3a49', alignItems: 'center'}}>
                            <View style={{ height: 3,width: '100%', backgroundColor: '#f7931e',marginBottom: 3}}>
                    
                            </View>
                            <InventoryCardSection>
                                <TouchableOpacity onPress={this.join}
                                    style={{backgroundColor: this.state.joinBackColor, width: '25%', justifyContent: "center",marginLeft:20, marginRight:20}}>
                                    <Text style={{ color: 'white',fontSize: 20}}>
                                    Join
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.create}
                                    style={{ backgroundColor: this.state.createBackColor,width: '25%',justifyContent: "center",marginLeft:20, marginRight:20}}>
                                    <Text style={{ color: 'white',fontSize: 20}}>
                                    Create
                                    </Text>
                                </TouchableOpacity>
                            </InventoryCardSection>
                            <TextInput style={{color: 'white',height: 40, width: '80%',backgroundColor: '#8190a5',borderWidth: 1}}
                                value={'Quick Share Code'}/>
                            
                            {this.state.isJoin ? <Join /> : <Create />}
                            
                        </View>
                    </Modal>
                

                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={this._toggleModal}>
                    
                </ActionButton>

            </View>
        );
    }
}

const styles = {
  textStyle: {
    fontSize: 40,
    marginLeft: 10,
    color: "#fff",
    backgroundColor: "transparent"
  },
  actionButtonIcon: {
    fontSize: 28,
    height: 30,
    color: "white"
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


