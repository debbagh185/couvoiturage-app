import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {Form, Item, Input, Button,Content, Left, Body} from 'native-base';
import signup from '../assets/images/signup.png';
import {connect} from 'react-redux';
import {createUser} from '../actions/UserActions';
import KeyboardShift from '../components/KeyboardShift';
import {validationSignUp} from '../components/Validation'

var validate = require("validate.js");

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '', 
        lastName: '', 
        userName: '', 
        email: '', 
        password: '',
        phone: ''
      },
        
      errors: {}
    }  
  }

  register= ()=> {
    Errors = validate({email: this.state.user.email , password: this.state.user.password , phone: this.state.user.phone } , validationSignUp)

    if(!Errors) {
      this.props.createUser(this.state.user)
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
        <Content>
          <Left />
          <Body>
             <Image source={signup} />
          <Form>
            <Item style={styles.item}>
              <Input 
              placeholder="First Name"
              autoCapitalize="none"
              autoCorrect={false}   
              onChangeText={(val) => {
                let newUser= Object.assign({} , this.state.user)
                newUser.firstName= val.trim()
                this.setState({user: newUser})
              }} />
            </Item>
            <Item style={styles.item}>
              <Input 
              placeholder="Last Name"
              autoCapitalize="none"
              autoCorrect
              onChangeText={(val) => {
                let newUser= Object.assign({} , this.state.user)
                newUser.lastName= val.trim()
                this.setState({user: newUser})
              }}/>
            </Item>
            <Item style={styles.item}>
              <Input 
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect 
              onChangeText={(val) => {
                let newUser= Object.assign({} , this.state.user)
                newUser.firstName= val.trim()
                this.setState({user: newUser})
              }}/>
            </Item>
            <Item style={styles.item}>
              <Input 
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false} 
              keyboardType= "email-address"
              onChangeText={(val) => {
                let newUser= Object.assign({} , this.state.user)
                newUser.email= val.trim()
                this.setState({user: newUser})
              }}/>
            </Item>
            <Item style={styles.item}>
              <Input
              placeholder="Password"
                autoCapitalize="none"
                autoCorrect
                secureTextEntry={true}
                onChangeText={(val) => {
                  let newUser= Object.assign({} , this.state.user)
                  newUser.password= val.trim()
                  this.setState({user: newUser})
                }}
               />
            </Item>
            <Item style={styles.item}>
              <Input 
              placeholder="Phone Number"
              autoCapitalize="none"
              autoCorrect 
              keyboardType= "phone-pad"
              onChangeText={(val) => {
                let newUser= Object.assign({} , this.state.user)
                newUser.phone= val.trim()
                this.setState({user: newUser})
              }}/>
            </Item>
          </Form>
          <Left />
          <Body>
            <Button 
            primary
            style={styles.butt} 
            onPress={() => this.register() }>
            <Text style={{color: 'white'}}>Sign Up</Text>
            </Button>
          </Body>
          
          <Text style= {styles.error}> {this.state.errors["email"]} </Text>
          <Text style= {styles.error}> {this.state.errors["password"]} </Text>
          <Text style= {styles.error}> {this.state.errors["phone"]} </Text>
          </Body>
        </Content>
        )}
        </KeyboardShift>
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

  error: {
    color: 'red',
    marginTop: 15
  }
});

const mapDispatchToProps = (dispatch) => {
  return { 
    createUser: (user) => dispatch(createUser(user))
  };
}

export default connect(null,mapDispatchToProps)(SignUp);