import React, { Component } from 'react'
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';


export default class FooterComp extends Component {
  render() {
    return (
        <Footer>
        <FooterTab>
          <Button onPress={()=> Actions._signup()} vertical>
            <Icon name="add" />
            <Text>Sign Up</Text>
          </Button>
          <Button onPress={()=> Actions._login({page: this.props.page}) } vertical>
            <Icon name="person" />
            <Text>Login</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
