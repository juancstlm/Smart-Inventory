import React from 'react';
import {Text,TextInput, View} from 'react-native';
import {Button, ButtonGroup, Avatar, SearchBar} from 'react-native-elements';
import InventoryCardSection from "../ui/InventoryCardSection";

class Create extends React.Component {

  state={name: '', disableCreate: true, selectedIndex: 0}

  constructor(props) {
    super(props);

    this.updateIndex = this.updateIndex.bind(this)
  }

  create = () => {
    if (this.state.name === ''){
      console.log('name not set')
    }
    else{
      //create an inventory object and add user as owner

    }
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  }

  render(){
    const buttons = ['Shared', 'Private'];
    const { selectedIndex } = this.state;

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
