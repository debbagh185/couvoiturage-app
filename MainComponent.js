import React, { Component } from 'react'
import {Router, Scene} from 'react-native-router-flux';
import {Container} from 'native-base';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen'
import * as Expo from 'expo';
import ChatScreen from './screens/ChatScreen';

export default class MainComponent extends Component {

  constructor(){
    super();
    this.state=({
      isReady: false
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
              <Scene key='root'>
                  <Scene key='login' component={LoginScreen} title='Login'/>
                  <Scene initial key='home' component={HomeScreen} title='Home'/>
                  <Scene key='chat' component={ChatScreen} title='Chat'/>
                  <Scene key='signup' component={SignUpScreen} title='Sign Up'/>
              </Scene>
          </Router>
      </Container>
    )
  }
}


