import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {Form, Item, Input, Button, Container, Label, Content, Left, Body} from 'native-base';
import signup from '../assets/images/signup.png';
import {connect} from 'react-redux';
import {createUser} from '../actions/Index';


class SignUp extends React.Component {

 constructor(props) {

   super(props);
   this.state = {
       firstName: '', 
       lastName: '', 
       userName: '', 
       email: '', 
       password: ''
    }
    
 }


  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  render() {
  
    return (
        <Content>
          <Left />
          <Body>
             <Image source={signup} />
          <Form>
            <Item floatingLabel style={styles.item}>
              <Input 
              placeholder="First Name"
              autoCapitalize="none"
              autoCorrect={false}   
              onChangeText={(val) => this.onChangeText('firstName', val)} />
            </Item>
            <Item floatingLabel style={styles.item}>
              <Input 
              placeholder="Last Name"
              autoCapitalize="none"
              autoCorrect
              onChangeText={(val) => this.onChangeText('lastName', val)}/>
            </Item>
            <Item floatingLabel style={styles.item}>
              <Input 
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect 
              onChangeText={(val) => this.onChangeText('userName', val)}/>
            </Item>
            <Item floatingLabel style={styles.item}>
              <Input 
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false} 
              
              onChangeText={(val) => this.onChangeText('email', val)}/>
            </Item>
            <Item floatingLabel style={styles.item}>
              <Input
              placeholder="Password"
                autoCapitalize="none"
                autoCorrect
                secureTextEntry={true}
                onChangeText={(val) => this.onChangeText('password', val)}
               />
            </Item>
          </Form>
          <Left />
          <Body>
            <Button 
            primary
            style={styles.butt} 
            onPress={() => this.props.createUser(this.state)}>
            <Text style={{color: 'white'}}>Sign Up</Text>
            </Button>
          </Body>
          
          </Body>
        </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  item: {
    width: 250,
  },

  butt: {
    marginTop: 40,
    justifyContent: 'center',
    width: 150,
  },
});

const mapStateToProps = (state) => {
  return { 
    userData: state.userData
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    createUser: (user) => dispatch(createUser(user))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);