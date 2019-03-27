import React, { Component } from 'react'
import {Text} from 'react-native'
import store from '../../store/configureStore';
import { View, Container, Content, Footer, FooterTab, Icon, Button } from 'native-base';
import {Actions} from "react-native-router-flux"

export default class AdDetailsScreen extends Component {
    constructor(props){
        super(props)
    }
    
  render() {
    return (
      <View>
        <Container>
          <Content>
              <Text>{store.getState().Router.Ad["prixParPlace"]}</Text>
          </Content>
          <Footer>
            <FooterTab>
                <Button onPress={()=> Actions.jump("_list") } vertical>
                  <Icon name="arrow-back" />
                </Button>
            </FooterTab>
          </Footer>
        </Container>
      </View>
      
    )
  }
}
