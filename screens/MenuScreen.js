import React, { Component } from "react";
import {
  Content,
  Text,
  List,
  ListItem,
  Separator,
  Icon
} from "native-base";
import { Actions } from "react-native-router-flux";
import links from "../constants/LinksName";
class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {}

  render() {
    return (
      <Content style={{ marginTop: 24 }}>
        <List>
        <Separator bordered>
            <Text>Menu</Text>
        </Separator>
        <ListItem
            onPress={() => Actions.home()}
            selected={Actions.currentScene == "_" + links.home}
        >
        <Icon name="home" color="#34495e" />
        <Text> Home</Text>
        </ListItem>
        <ListItem
            onPress={() => Actions.proposer()}
            selected={Actions.currentScene == "_" + links.proposer}
        >
        <Icon name="map" color="#34495e" />
        <Text> Proposer un trajet</Text>
        </ListItem>
        <ListItem
            onPress={() => Actions.chercher()}
            selected={Actions.currentScene == "_" + links.chercher}
        >
        <Icon name="search" color="#34495e" />
        <Text> Chercher un trajet</Text>
        </ListItem>
        </List>
      </Content>
    );
  }
}

export default MenuScreen;
