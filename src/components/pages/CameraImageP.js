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
        	picked: null,
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

		const { visible, picked, options } = this.state;
		const { navigation } = this.props;
		const imagePath = navigation.getParam('imagePath', 'NO-Path');
		const items = navigation.getParam('items','No-Item');

		console.log("items found are:")
		console.log(items)	

		var arr = [];
		for(var i = 0, len = items.length; i < len; i++) {
		  arr.push( {"key": items[i].id, "label": items[i].name});
		}

		console.log("items found are dos:")
		console.log(arr)


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
	}
});
