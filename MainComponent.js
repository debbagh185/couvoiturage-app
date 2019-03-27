import React, { Component } from 'react'
import { Router, Scene, Drawer, Actions } from "react-native-router-flux";
import {Container, Button, Text} from 'native-base';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ChercherTrajetScreen from './screens/ChercherTrajet/ChercherTrajetScreen';
import ProposerTrajetScreen from './screens/ProposerTrajet/ProposerTrajetScreen';
import ProposerAdScreen from './screens/ProposerTrajet/ProposerAdScreen';
import MenuScreen from './screens/MenuScreen';
import MapScreen from './screens/MapScreen'
import {StyleSheet} from 'react-native'
import ProfileScreen from './screens/ProfileScreen';
import ListTrajetScreen from './screens/ChercherTrajet/ListeTrajetScreen';
import MenuBackIcon from './assets/images/back.png'
import ProposerSuccessScreen from './screens/ProposerTrajet/ProposerSuccessScreen'
import AdDetailsScreen from './screens/ChercherTrajet/AdDetailsScreen';
 



export default class MainComponent extends Component {

  constructor(props){
    super(props);
    this.state=({
      isReady: false,
    })
  }  

  async componentWillMount() {
    await Expo.Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
    }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
      }
    return (
    <Container>
      <Router>    
              <Drawer
              key="drawerMenu"
              contentComponent={MenuScreen}
              drawerWidth={250}
              drawerPosition="right"
              back >
              <Scene key='_profile' component={ProfileScreen} title='Profile'/>
              <Scene key='_login' component={LoginScreen} title='Login'/>
              <Scene initial key='_home' component={HomeScreen} title='Home'/>
              <Scene key='_chat' component={ChatScreen} title='Chat'/>
              <Scene key='_signup' component={SignUpScreen} title='Sign Up'/>
              <Scene key='_chercher' component={ChercherTrajetScreen} title='Chercher un trajet'/>
              <Scene key='_proposer' component={ProposerTrajetScreen} title='Proposer un trajet : Etape 1'/>
              <Scene key='_proposer2' component={ProposerAdScreen} title='Proposer un trajet : Etape 2'/>
              <Scene key='_list' component={ListTrajetScreen} title='Liste des trajets'/>
              <Scene key='_proposerSuccess' component={ProposerSuccessScreen} title='Publié avec succès!'/>
              <Scene key='_map' component={MapScreen} title='Map'/>
              <Scene key='_adDetails' component={AdDetailsScreen} title="Des information sur l'annonce"/>
              </Drawer>  
      </Router>
  </Container>

    )
  }
}


const styles=StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


