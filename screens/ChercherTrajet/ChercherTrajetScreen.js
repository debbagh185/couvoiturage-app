import React, { Component } from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { View, Form, Input, Item, Label, Button, Container, Icon, Left, Body,} from 'native-base';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';

export default class ChercherTrajetScreen extends Component {

  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosenDate: '',
    }
  }

  showPicker = () => {
    this.setState({ isVisible: true })
  };

  hidePicker = () => {
    this.setState({ isVisible: false })
  };

  handlePicker = (date) => {
    this.hidePicker();
    this.setState({
      chosenDate: moment(date).format('D MMMM YYYY HH:mm')
    })
  };


  render() {
    return (
      <Container style= {styles.container}>
        <Text style={styles.text}>Trouver un trajet</Text>
        <Form>
          <Item inlineLabel style={styles.item}>
            <Label>Départ</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              //onChangeText= {(email) => this.setState({['myemail']: email})}
            />
          </Item>

          <Item inlineLabel style={styles.item}>
            <Label>Destination</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              //onChangeText= {(password) => this.setState({['mypassword']: password})}
            />
          </Item>
        </Form>
        <TouchableOpacity onPress={this.showPicker} style= {styles.text}>
            <Text><Icon name="clock" /> Date et heure</Text>
            <Text style={{color: "blue", fontSize:15}}>{this.state.chosenDate}</Text>
        </TouchableOpacity>
        <View>
          <Button 
            primary 
            style={styles.butt}
            onPress= {() => Actions._list()}
          >
            <Text style={{color: 'white'}}>Continuer</Text>
          </Button>
        </View>    
        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={"datetime"}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    width: 280,
  },

  text: {
    padding: 60,
  },

  butt: {
    marginTop: 60,
    justifyContent: 'center',
    width: 150,
  },
});
