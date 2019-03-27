import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Form, Input, Item, Label, Button, Container } from 'native-base';
import {Actions} from 'react-native-router-flux';
import login from '../assets/images/login.png';
import {connect} from 'react-redux';
import {loginUser} from '../actions/UserActions';
import KeyboardShift from '../components/KeyboardShift';
import validationLogin from '../components/Validation';

var validate= require("validate.js");


class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state= ({
      myemail: "",
      mypassword: "",
      errors: {}
    })

  }

  register= ()=> {
    Errors = validate({email: this.state.myemail , password: this.state.mypassword} , validationLogin)

    if(!Errors) {
      this.props.loginUser(this.state.myemail , this.state.mypassword)
    }
    else{
      this.setState({
        errors: JSON.parse(JSON.stringify(Errors))
      })
    }
  }

  render() {
    return (
    <KeyboardShift> 
        {()=>(
      <Container style={styles.container}>
        <Image source={login} />
        <Form>
          <Item  floatingLabel style={styles.item}>
            <Input
              autoCapitalize="none"
              placeholder="Email"
              autoCorrect={true}
              keyboardType= "email-address"
              onChangeText= {(email) => this.setState({myemail: email.trim()})}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect
              placeholder="Password"
              onChangeText= {(password) => this.setState({mypassword: password.trim()})}
            />
          </Item>
        </Form>

        <View>
          <Button 
            primary 
            style={styles.butt}
            onPress= {() => this.register()}>
            <Text style={{color: 'white'}}>Login</Text>
          </Button>
          <Button 
            bordered 
            primary 
            style={styles.butt}
            onPress={() => { Actions._signup() }}
            >
            <Text style={{color: 'green'}}>Sign Up</Text>
          </Button>
        </View>
        <Text style= {styles.error}> {this.state.errors["email"]} </Text>
        <Text style= {styles.error}> {this.state.errors["password"]} </Text>
      </Container>
        )}
    </KeyboardShift>

    );
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

  error: {
    color: 'red',
    marginTop: 15
  }
});


const mapDispatchToProps = (dispatch) => {
  return { 
    loginUser: (email, password) => dispatch(loginUser(email, password))
  };
}

export default connect(null,mapDispatchToProps)(LoginScreen);