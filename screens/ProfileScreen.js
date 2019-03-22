import React, { Component } from 'react';
import { Container, Tab, Tabs,  Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button  } from 'native-base';
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
                <Text>{store.getState().User.userData.email}</Text>
          </Tab>
          <Tab heading="Les trajets">
              <Content>
              <List>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: 'Image URL' }} />
                  </Left>
                  <Body>
                    <Text>Sankhadeep</Text>
                    <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Tab>
          <Tab heading="Les demandes">
            <Container>
              <Tabs>
                <Tab heading="Envoyé">
                    <Content>
                      <List>
                        <ListItem thumbnail>
                          <Left>
                            <Thumbnail square source={{ uri: 'Image URL' }} />
                          </Left>
                          <Body>
                            <Text>Sankhadeep</Text>
                            <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                          </Body>
                          <Right>
                            <Button transparent>
                              <Text>View</Text>
                            </Button>
                          </Right>
                        </ListItem>
                      </List>
                    </Content>
                </Tab>
                <Tab heading="Reçu">
                    <Content>
                      <List>
                        <ListItem thumbnail>
                          <Left>
                            <Thumbnail square source={{ uri: 'Image URL' }} />
                          </Left>
                          <Body>
                            <Text>Sankhadeep</Text>
                            <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                          </Body>
                          <Right>
                            <Button transparent>
                              <Text>View</Text>
                            </Button>
                          </Right>
                        </ListItem>
                      </List>
                    </Content>
                </Tab>
              </Tabs>
            </Container>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

