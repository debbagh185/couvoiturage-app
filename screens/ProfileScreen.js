import React, { Component } from 'react';
import { Container, Tab, Tabs, Text } from 'native-base';
import {connect} from 'react-redux';
import {watchUserData} from '../actions/Index';

class ProfileScreen extends Component {
  constructor(props){
    super(props);
    this.props.watchUserData();
 }
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Profil">
                <Text>{this.props.userData.id}</Text>
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

const mapStateToProps = (state) => {
  return { 
    userData: state.userData
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    watchUserData: () => dispatch(watchUserData())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);