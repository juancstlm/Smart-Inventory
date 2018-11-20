import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';

class DisplayImage extends Component {

	render() {

		const viewRef = null;
		const { navigation } = this.props;
		const imagePath = navigation.getParam('imagePath', 'NO-Path');
		const itemName = navigation.getParam('itemName','No-Item');
		const base64String = navigation.getParam('base64String','No-Item');

		console.log("base64String converted");
		console.log(`data:image/png;base64,${base64String}`);
		
		return (
			<View style={styles.background}>			
			        <Image
			            style={{ 
			              flex: 1,
			              resizeMode: 'stretch'
			            }} 
			            source={{ uri: `data:image/png;base64,${base64String}`}}
			            //source={{uri: imagePath}}
			        />
		        <BlurView
		          style={styles.absolute}
		          viewRef={null}
		          blurType={viewRef}
		          blurAmount={10}
		        />	
			</View>
		);
	}
}

const styles = {
	background: {
		backgroundColor: '#2F3A49',
		flex: 1,
	},
	absolute: {
		position: "absolute",
	    top: 0, left: 0, bottom: 0, right: 0,
	}
};

export default DisplayImage;