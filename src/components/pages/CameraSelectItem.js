import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator, Text, View, FlatList,Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { BlurView, VibrancyView } from 'react-native-blur';
import ModalFilterPicker from 'react-native-modal-filter-picker'

export default class CameraSelectItem extends React.Component {

	constructor(props){
		super(props);
        this.state = { 
        	visible: true,
        	picked: null,
			options: [
		      {
		        key: 'kenya',
		        label: 'Kenya',
		      },
		      {
		        key: 'uganda',
		        label: 'Uganda',
		      },
		      {
		        key: 'libya',
		        label: 'Libya',
		      },
		      {
		        key: 'morocco',
		        label: 'Morocco',
		      },
		      {
		        key: 'estonia',
		        label: 'Estonia',
		      },
	    ]
		}
    }

  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = (picked) => {
    this.setState({
      picked: picked,
      visible: false
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }    

	render() {
	    const { visible, picked, options } = this.state;

		return (
		      <View style={styles.container}>
		        <TouchableOpacity style={styles.buttonStyle} onPress={this.onShow}>
		          <Text style={styles.textStyle}>Select country</Text>
		        </TouchableOpacity>      
		        <Text style={{fontSize: 15, color: 'black'}}>Selected:</Text>
		        <Text>{picked}</Text>
		        <ModalFilterPicker
		          visible={visible}
		          onSelect={this.onSelect}
		          onCancel={this.onCancel}
		          options={options}
		        />
		      </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0, 
		justifyContent: 'center', 
		alignItems: 'center',
		height: 100
	},
	textStyle: {
		alignSelf: 'center',
		color: '#ffffff',
		fontSize: 13,
		fontWeight: '600'
	},
	buttonStyle: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#2F3A49',
		borderRadius: 5,
		marginLeft: 10,
		marginRight: 10
	}
});
