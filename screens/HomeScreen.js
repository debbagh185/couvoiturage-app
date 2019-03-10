import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import proposer from '../assets/images/proposer.jpg'
import chercher from '../assets/images/chercher.jpg'
import path from '../assets/images/path.png'
import search from '../assets/images/search.png'
import {Actions} from 'react-native-router-flux'

export default class HomeScreen extends Component {
  render() {
    return (
    <View style={{flex:1}}>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={search} />
                <Body>
                  <Text>Chercher un trajet</Text>
                  <Text note>description</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={chercher} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>  
            <Button onPress={() => Actions.chercher()} block primary>
              <Text>Chercher un trajet</Text>
            </Button>
          </Card>
            <Text light style={styles.txt}>ou</Text>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={path} />
                <Body>
                  <Text>Proposer un trajet</Text>
                  <Text note>description</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={proposer} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>  
            <Button onPress={() => Actions.proposer()} block primary>
              <Text>Proposer un trajet</Text>
            </Button>
          </Card>
        </Content>
        
    </View>
      
     
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    marginLeft: 220
  },
});