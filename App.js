import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainComponent from './MainComponent';
import { Header } from 'native-base';

export default class App extends React.Component {
  render() {
    return (  
      <View style={{flex: 1}}>
        <MainComponent />
      </View>   
      
    );
  }
}

