import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Button,Left, Body} from 'native-base';
import proposer from '../assets/images/proposer.jpg'
import chercher from '../assets/images/chercher.jpg'
import path from '../assets/images/path.png'
import search from '../assets/images/search.png'
import {Actions} from 'react-native-router-flux'
import FooterComp from '../components/FooterComp';
import LoadingComp from '../components/LoadingComp';
import {connect} from 'react-redux';
import {watchUserData, testAuth} from '../actions/UserActions';

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      oneTime:true
    }

 }

 componentWillMount(){
  this.props.testAuth(); 
 }

 componentDidMount(){
  if(this.props.loggedin && this.state.oneTime) {
    this.props.watchUserData();
    this.setState({oneTime: false});
  }
 }

  render() { 
      return (
        <View style={{flex:1}}>
          <Content>
          <TouchableOpacity onPress={() => Actions._chercher()} >
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={search} />
                  <Body>
                    <Text>Chercher un trajet</Text>
                    <Text note>description</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={chercher} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>  
              <Button onPress={() => Actions._chercher()} block primary>
                <Text>Chercher un trajet</Text>
              </Button>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions._proposer()} >
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={path} />
                  <Body>
                    <Text>Proposer un trajet</Text>
                    <Text note>description</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={proposer} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>  
              <Button onPress={() => Actions._proposer()} block primary>
                <Text>Proposer un trajet</Text>
              </Button>
            </Card>
            </TouchableOpacity>
          </Content>
          {!this.props.loggedin && <FooterComp page={Actions.currentScene}/>}
      </View>
      );
  }
}

const styles = StyleSheet.create({
  
});

const mapStateToProps = (state) => {
  return { 
    userData: state.User.userData,
    loggedin: state.User.loggedin,
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    watchUserData: () => dispatch(watchUserData()),
    testAuth: () => dispatch(testAuth()),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);