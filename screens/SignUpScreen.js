import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {Form, Item, Input, Button, Container, Label} from 'native-base';
import signup from '../assets/images/signup.png';
import Backend from '../components/Backend';


export default class SignUp extends React.Component {

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
      <Container style={styles.container}>
         <Image source={signup} />
          <Form style={styles.form}>
            <Item floatingLabel style={styles.item}>
            <Label>First Name</Label>
              <Input 
              autoCapitalize="none"
              autoCorrect={false} 
                
              onChangeText={(val) => this.onChangeText('firstName', val)} />
            </Item>
            <Item floatingLabel style={styles.item}>
            <Label>Last Name</Label>
              <Input 
              autoCapitalize="none"
              autoCorrect={false} 
              
              onChangeText={(val) => this.onChangeText('lastName', val)}/>
            </Item>
            <Item floatingLabel style={styles.item}>
            <Label>Username</Label>
              <Input 
              autoCapitalize="none"
              autoCorrect={false} 
              
              onChangeText={(val) => this.onChangeText('userName', val)}/>
            </Item>
            <Item floatingLabel style={styles.item}>
            <Label>Email</Label>
              <Input 
              autoCapitalize="none"
              autoCorrect={false} 
              
              onChangeText={(val) => this.onChangeText('email', val)}/>
            </Item>
            <Item floatingLabel style={styles.item}>
            <Label>Password</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
               
                secureTextEntry={true}
                onChangeText={(val) => this.onChangeText('password', val)}
               />
            </Item>
          </Form>

          <View>
            <Button 
            success
            style={styles.butt} 
            onPress={() => Backend.signUp(this.state)}>
            <Text style={{color: 'white'}}>Sign Up</Text>
            </Button>
          </View>
      </Container>

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
    marginTop: 20,
    justifyContent: 'center',
    width: 150,
  },
});