import React, { Component } from 'react';
import { Container, Tab, Tabs, Text } from 'native-base';
import store from '../store/configureStore'
import {watchUserData} from '../actions/UserActions'
import {connect} from 'react-redux'

class ProfileScreen extends Component {
  constructor(props){
    super(props);
    this.props.watchUserData()
   
 }
  render() {

    return (
      <Container>
        <Tabs>
          <Tab heading="Profil">
                <Text>{store.getState().User.userData.email}</Text>
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
    userData: state.User.userData,
    loggedin: state.User.loggedin,
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    watchUserData: () => dispatch(watchUserData()),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);