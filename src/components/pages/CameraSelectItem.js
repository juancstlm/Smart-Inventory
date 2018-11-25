import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator, Text, View, FlatList,Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { BlurView, VibrancyView } from 'react-native-blur';
import ModalFilterPicker from 'react-native-modal-filter-picker'

export default class CameraSelectItem extends React.Component {

	constructor(props){
		super(props);
		const { params } = props.navigation.state;
		this.selectItemButton = this.selectItemButton.bind(this);
        this.state = { 
        	picked: null,
        	imagefirebase: params.imagefirebase
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

    selectItemButton(image){
    	const itemName = this.state.picked;	
        this.props.navigation.navigate('ItemConfirmation', { 
        	itemName: itemName,
        	imagePath: image,
        	imagefirebase: this.state.imagefirebase
        });    	
    }
    
	render() {

		const { visible, picked, options } = this.state;
		const { navigation } = this.props;
		const imagePath = navigation.getParam('imagePath', 'NO-Path');
		const items = navigation.getParam('items','No-Item');

		var arr = [];
		for(var i = 0, len = items.length; i < len; i++) {
		  arr.push( {"key": items[i].name, "label": items[i].name});
		}

		return (
			<View style={styles.preview}>
				
				<Image
					style={{
						flex:1,
						height: Dimensions.get('window').height,
						width: Dimensions.get('window').width,
					}}
					source={{ isStatic: true, uri: imagePath.uri }}
				/>

				<BlurView
		          style={styles.absolute}
		          viewRef={this.state.viewRef}
		          blurType="light"
		          blurAmount={10}
		        />	

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
			          options={arr}
			        />
			      </View>	

		        <TouchableHighlight
		          style={styles.capture}
		          onPress={ () => this.selectItemButton(imagePath) }
		          underlayColor="rgba(255, 255, 255, 0.5)"
		        >
		          <View />
		        </TouchableHighlight>

            </View>
		);
	}
}

const styles = StyleSheet.create({
    preview: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		backgroundColor: 'red'
	},
	absolute: {
		position: "absolute",
	    top: 0, left: 0, bottom: 0, right: 0,
	},
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
	},
	capture: {
	    width: 70,
	    height: 70,
	    borderRadius: 35,
	    borderWidth: 5,
	    borderColor: '#FFF',
	    marginBottom: 15,
  }
});
