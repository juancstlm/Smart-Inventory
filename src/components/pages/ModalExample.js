import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import Tags from "react-native-tags";
//

export default class ModalExample extends Component {
  state = {
    visibleModal: null,
    emails: []

  };

  constructor(props) {
    super(props);
    this.setEmailTags = this.setEmailTags.bind(this);
    this.setState({
      emails: ['']
    })
  }

  setEmailTags = (tags) => {
    this.setState({
      emails: tags,
    });
    console.log("thank the lord: ",tags);
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );


  _renderModalContent = () => (
    <View style={styles.modalContent}>
      
      <View styles={{top: 0, position: 'absolute', width:300, backgroundColor: 'red', height: 50}}>
        <Text>
          Enter Emails:
        </Text>
      </View>
      
      <View style={{height: 175, width: 300, backgroundColor: 'green', borderRadius: 4}}>
        <Tags
          initialText=""
          initialTags={this.state.emails}
          onChangeTags={tags => 
            this.setEmailTags(tags)
          }
          onTagPress={(index, tagLabel, event) => console.log(index, tagLabel, event)}
          inputStyle={{ backgroundColor: "white" }}
        />
      </View>
      <View style={{bottom: 0, position: 'absolute'}}>
        {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
      </View>  
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this._renderButton('Add Emails', () => this.setState({ visibleModal: 1 }))}        
        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    height: 300,
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});