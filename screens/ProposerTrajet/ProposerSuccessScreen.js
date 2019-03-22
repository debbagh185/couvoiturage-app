import React, { Component } from 'react'
import { Container, Content, Button, Text} from 'native-base';
import store from '../../store/configureStore'
import {Actions} from 'react-native-router-flux'
import {View} from 'react-native'

export default class ProposerSuccessScreen extends Component {
  constructor(props){
    super(props)
    if(!store.getState().User.loggedin) Actions._login()
  }
  render() {
    return (
    <View style={{flex:1}}>
      <Container>
        <Content>
           <Text>Proposer Success Screen</Text>
           <Button primary><Text>Voir vos annonces</Text></Button>
        </Content>
      </Container>
    </View>
      
     
    )
  }
}
