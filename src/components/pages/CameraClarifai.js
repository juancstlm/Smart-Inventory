import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator, Text, View, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton2 from '../ui/CaptureButton2';

export default class CameraClarifai extends React.Component {

	constructor(props){
		super(props);
        this.state = { 
			loading: false,
			itemsFromClarifai: [],
			retrievedData: false,
		}
    }

    takePicture = async function(){	
		if (this.camera) {
			this.camera.pausePreview();            
			this.setState((previousState, props) => ({
				loading: true
			}));
			const options = {
                base64: true
            };			
			const data = await this.camera.takePictureAsync(options)
			this.identifyImage(data);
		}
	}

	identifyImage(imageData){	
		const Clarifai = require('clarifai');
		const app = new Clarifai.App({
			apiKey: '5f5705d75ac94f50a803b2eaa865c201'
		});
		app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData.base64})
			.then((response) => this.props.navigation.navigate('CameraSelectItem', {
			 imagePath: imageData, 
			 items: response.outputs[0].data.concepts
			})
			.catch((err) => alert(err))
		);
	}
    
	render() {
		return (
			<View style={{flex: 1}}>
            <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
            <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
                <CaptureButton2 buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
            </RNCamera>
            
            </View>
		);
	}
}

const styles = StyleSheet.create({
    preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	loadingIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerStyle:{
		height: 150,
		justifyContent: 'center'
	}
});