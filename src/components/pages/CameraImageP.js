import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator, Text, View, FlatList,Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { BlurView, VibrancyView } from 'react-native-blur';
import ModalFilterPicker from 'react-native-modal-filter-picker'
import CameraSelectItem from './CameraSelectItem'

export default class CameraImageP extends React.Component {

	constructor(props){
		super(props);
        this.state = { 
			itemsFromClarifai: [
			{
				id: "1",
				name: "pizza",
				value: 99.99
			},
			{
				id: "2",
				name: "hotdog",
				value: 89.44
			},
			{
				id: "3",
				name: "rice",
				value: 77.66
			},
			{
				id: "4",
				name: "fish",
				value: 56.45
			},
			{
				id: "5",
				name: "chicken",
				value: 34.34
			},
			]
		}
    }

    renderClassification(){
    	return(
	     	<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
	             <FlatList 
		              data = {this.state.itemsFromClarifai}
		              keyExtractor={(item, index) => item.id}
		              contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
		              renderItem={({item})=>
		              <Text>{item.name}</Text>
		              }
	             />
	    	</View>   	
    	);
    }

    renderBlurImage(){
 		return (
			<View style={styles.preview}>
				<Image
					style={{
						flex:1,
						resizeMode: 'stretch'
					}}
					source = {require("../../img/bike2.jpeg")} 
				/>
		        <BlurView
		          style={styles.absolute}
		          viewRef={this.state.viewRef}
		          blurType="light"
		          blurAmount={10}
		        />				
				{this.renderClassification()}				           
            </View>
		);   	
    }

	render() {
		return (
			<View style={styles.preview}>
				<Image
					style={{
						flex:1,
						resizeMode: 'stretch'
					}}
					source = {require("../../img/bike2.jpeg")} 
				/>
		        <BlurView
		          style={styles.absolute}
		          viewRef={this.state.viewRef}
		          blurType="light"
		          blurAmount={10}
		        />				
				<CameraSelectItem>
				</CameraSelectItem>	           
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
	}
});
