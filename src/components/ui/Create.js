import React from 'react';
import {Text,TextInput, View} from 'react-native';
import {Button, ButtonGroup, Avatar, SearchBar} from 'react-native-elements';
import InventoryCardSection from "../ui/InventoryCardSection";
import Firebase from "../../Firebase";
import Toaster, { ToastStyles } from 'react-native-toaster'
import store from "../../redux/store";

class Create extends React.Component {

  state={name: '', disableCreate: true, selectedIndex: 0, message: null, inventories: []}

  constructor(props) {
    super(props);

    this.updateIndex = this.updateIndex.bind(this)

    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched), 
      // we will update local component state and force component to rerender 
      // with new data.
  
      this.setState({
        inventories: store.getState().inventories,
      });
    });
  }


  create = () => {
    var add = true;
    if (this.state.name === ''){
      console.log('name not set')
    }
    else{
      //create an inventory object and add user as owner
      this.props.inventories.map(inv => {
        console.log(inv.name);
        if (inv.name.toLowerCase() === this.state.name.toLowerCase()) {
          add = false;
        }
      });
      if( add === true){
            ref = Firebase.firestore.collection('Inventories').doc()
            ref.set({
              image: 'https://c1.staticflickr.com/5/4916/45053006915_f22a94ea77_c.jpg',
              items: [],
              name: this.state.name,
              owner_id: Firebase.auth.currentUser.uid,
              users: [],
              invite_id: ref.id,
            }).then(ref => {
              console.log('Added document with ID: ', ref.id);
            });

            this.setState({message: { text: 'Inventory Created!', styles: ToastStyles.success }});
            
        }
        else{
          this.setState({message: { text: 'Cannot Create Inventory! Name already in use.Choose another name.', styles: ToastStyles.error }});
        }
    }
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  }

  render(){
    const buttons = ['Shared', 'Private'];
    const { selectedIndex } = this.state;
    console.log(this.state.inventories);
    return (
      <View style={{flex: 1, height: '100%',width:'100%', backgroundColor: '#2f3a49', alignItems: 'center'}}>
        <TextInput
          onChangeText={(text) => {this.setState({name: text});
            this.setState({ disableCreate: (this.state.name.length < 2) });}}
          clearButtonMode='while-editing'
          autoFocus={true}
          style={{
            color: "white",
            height: 40,
            fontSize: 18,
            width: "80%",
            backgroundColor: "#8190a5",
            borderWidth: 1,
            borderRadius: 3,
            marginBottom: 15,
            marginTop: 10,
          }}
          placeholder={" Inventory name"}
          placeholderTextColor={"white"}/>

        <Text style={{color: "white", height: 22,fontSize: 18, alignSelf: 'auto', marginBottom: 1}}>
          Sharing:
        </Text>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 35, width: "60%", borderWidth: 0, marginTop: 2}}
          innerBorderStyle={{color: '#e79100'}}
          selectedBackgroundColor={"#e79627"}
          selectedTextStyle={{color: '#fff'}}
          selectedButtonStyle={{backgroundColor: '#e79627'}}
          buttonStyle={{backgroundColor:"#2f3a49", borderWidth: 0}}
          textStyle={{color:'#fff'}} />

        <InventoryCardSection>
          <View style={{flex: 2, height: 100, backgroundColor: '00000000', blurRadius: 1}}/>
        </InventoryCardSection>

        { <Toaster message={this.state.message} onHide={()=> {this.setState({message: null})}}/>}
         
        <View style={{width: '40%', alignItems:'stretch'}}>
          <Button onPress={this.create} title='CREATE' disabled={this.state.disableCreate}/>
        </View>

      </View >
    );
  }

};

const styles= {

};

export default Create;
