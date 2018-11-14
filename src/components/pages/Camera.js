import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CoreMLImage from "react-native-core-ml-image";
import CameraButton from '../ui/CameraButton';


const BEST_MATCH_THRESHOLD = 0.05;

export default class Camera extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      classification: null,
      percentage: null
    };
  }


 // checks if top classification is better than our previously set best match
  onClassification(classifications) {
    var bestMatch = null;

    if (classifications && classifications.length > 0) {
      // Loop through all of the classifications and find the best match
      classifications.forEach((classification) => {
        if (!bestMatch || classification.confidence > bestMatch.confidence) {
          bestMatch = classification;
        }
      });

      // Is best match confidence better than our threshold?
      if (bestMatch.confidence >= BEST_MATCH_THRESHOLD) {
        this.setState({
          bestMatch: bestMatch
        });
      } else {
        this.setState({
          bestMatch: null
        });
      }

    } else {
      this.setState({
        bestMatch: null
      });
    }
    
  }

  takePicture() {
    const options = {}

    this.camera.capture({metadata: options}).then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    var classification = null;
    var percentage = null;


    if (this.state.bestMatch) {
      if (this.state.bestMatch && this.state.bestMatch.identifier) {
        classification = this.state.bestMatch.identifier;
        percentage = this.state.bestMatch.confidence;
      } 
    }

    return (
      <View style={styles.container}>
          <CoreMLImage modelFile="Resnet50" onClassification={(evt) => this.onClassification(evt)}>
              <View style={styles.container}>
                <Text style={styles.info}>{classification} {percentage} </Text>
              </View>
          </CoreMLImage>
              
          <View style={styles.buttonContainer}>
                <Text 
                style={styles.info} 
                onPress={() => { this.props.navigation.navigate('ItemConfirmation', { itemName: '{classification}',});}}>
                  Hiiiiii
                </Text>
          </View>


          <CameraButton onPress={() => { this.props.navigation.navigate('ItemConfirmation', { itemName: classification});}}>
          </CameraButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  info: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: 'center',
    fontWeight: "900",
  },
    buttonContainer: {
      height: 20,
      bottom: 250,
      backgroundColor: 'transparent'
  }
});