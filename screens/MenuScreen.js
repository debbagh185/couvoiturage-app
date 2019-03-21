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
import {connect} from 'react-redux';
import {signOut} from '../actions/UserActions';

class MenuScreen extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Content style={{ marginTop: 24 }}>
        <List>
        <Separator bordered>
            <Text>Menu</Text>
        </Separator>
        {this.props.loggedin && <ListItem
            onPress={() => Actions._profile()}
            selected={Actions.currentScene == "_" + links.profile}
        >
        <Icon name="person" color="#34495e" />
        <Text> Profil</Text>
        </ListItem>}
        <ListItem
            onPress={() => Actions._home()}
            selected={Actions.currentScene == "_" + links.home}
        >
        <Icon name="home" color="#34495e" />
        <Text> Home</Text>
        </ListItem>
        <ListItem
            onPress={() => Actions._proposer()}
            selected={Actions.currentScene == "_" + links.proposer}
        >
        <Icon name="map" color="#34495e" />
        <Text> Proposer un trajet</Text>
        </ListItem>
        <ListItem
            onPress={() => Actions._chercher()}
            selected={Actions.currentScene == "_" + links.chercher}
        >
        <Icon name="search" color="#34495e" />
        <Text> Chercher un trajet</Text>
        </ListItem>
        {this.props.loggedin && <ListItem
            onPress={() => {this.props.signOutUser(); Actions._home()}}
        >
        <Icon name="arrow-back" color="#34495e" />
        <Text> Sign Out</Text>
        </ListItem>}
        </List>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    loggedin : state.User.loggedin
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    signOutUser: () => dispatch(signOut())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuScreen);
