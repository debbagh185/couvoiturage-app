import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Form, Input, Item, Label, Button, Container } from 'native-base';
import firebaseSvc from "../components/Db";
import {Actions} from 'react-native-router-flux';
import login from '../assets/images/login.png';


class LoginScreen extends Component {

  constructor(props) {
    super(props)

    this.state= ({
      myemail: "",
      mypassword: ""
    })

  }

  render() {
    return (

      <Container style={styles.container}>
          <Image source={login} />
          <Form>
          <Item floatingLabel style={styles.item}>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText= {(email) => this.setState({['myemail']: email})}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText= {(password) => this.setState({['mypassword']: password})}
            />
          </Item>
        </Form>

        <View>
        <Button 
          success 
          style={styles.butt}
          onPress= {() => firebaseSvc.LoginUser(this.state.myemail , this.state.mypassword)}>
          <Text style={{color: 'white'}}>Login</Text>
          </Button>
          <Button 
          bordered 
          success 
          style={styles.butt}
          onPress={() => {
            Actions.signup()
          }}
          >
          <Text style={{color: 'green'}}>Sign Up</Text>
        </Button>
        </View>

      </Container>

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
});


export default LoginScreen;