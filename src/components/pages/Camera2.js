import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator, Text, View, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton2 from '../ui/CaptureButton2';

export default class Camera2 extends React.Component {

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

			// Pause the camera's preview
			this.camera.pausePreview();
            
            // Set the activity indicator
			this.setState((previousState, props) => ({
				loading: true
			}));
			
			// Set options
			const options = {
                base64: true
            };
			
			// Get the base64 version of the image
			const data = await this.camera.takePictureAsync(options)
			
			// Get the identified image
			this.identifyImage(data);
		}
	}

//this.displayAnswer(response.outputs[0].data.concepts)
	identifyImage(imageData){
		
		// Initialise Clarifai api
		const Clarifai = require('clarifai');

		const app = new Clarifai.App({
			apiKey: '5f5705d75ac94f50a803b2eaa865c201'
		});

		// Identify the image
		app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData.base64})
			.then((response) => this.props.navigation.navigate('CameraImageP', {
			 imagePath: imageData, 
			 items: response.outputs[0].data.concepts
			})
			.catch((err) => alert(err))
		);
	}

	displayAnswer(identifiedImages){
		console.log(identifiedImages)
		// Dismiss the acitivty indicator
		this.setState((prevState, props) => ({
			itemsFromClarifai:identifiedImages,
			loading:false,
			retrievedData: true
		}));

	}

	renderList(){
		return(
			<View style={styles.containerStyle}>           
             <FlatList 
              data = {this.state.ibmData}
              keyExtractor={(item, index) => item.id}
              renderItem={({item})=>
              <Text>{item.name}</Text>
              }
             />
            </View>
		)
	}

	renderClassifcations(){
		return(
			<View style={styles.containerStyle}>           
             <FlatList 
              data = {this.state.itemsFromClarifai}
              keyExtractor={(item, index) => item.id}
              renderItem={({item})=>
              <Text>{item.name}</Text>
              }
             />
            </View>
		)
	}
    
	render() {
		return (
			<View style={{flex: 1}}>
            <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
            <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
                <CaptureButton2 buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
            </RNCamera>

            {this.renderClassifcations()}
            
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