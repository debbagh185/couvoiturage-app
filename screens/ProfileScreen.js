import React, { Component } from 'react';
import { Container, Tab, Tabs, Text } from 'native-base';
import store from '../store/configureStore'


export default class ProfileScreen extends Component {
  constructor(props){
    super(props);
   
 }
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Profil">
                <Text>{store.getState().userData.email}</Text>
          </Tab>
          <Tab heading="Les trajets">
             
          </Tab>
          <Tab heading="Les demandes">
             
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
