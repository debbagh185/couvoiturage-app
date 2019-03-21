import React, { Component } from 'react';
import KeyboardShift from '../../components/KeyboardShift';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Form, Icon, Button, Input, Content, Container } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import SearchableDropdown from 'react-native-searchable-dropdown';
import objects from '../../constants/objects';
import Slider from "react-native-slider";

//Item array for the dropdown
var items = objects.Cities;

export default class ProposerTrajetScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isVisibleGo: false,

      isVisibleBack: false,
      nbrplaces: 1,
      chosenDateGo: '',
      chosenDateBack: '',
      serverData: [],
      departCity: {},
      destCity: {}
    }
  }

  showPickerGo = () => {
    this.setState({ isVisibleGo: true })
  };
  showPickerBack = () => {
    this.setState({ isVisibleBack: true })
  };

  hidePickerGo = () => {
    this.setState({ isVisibleGo: false })
  };
  hidePickerBack = () => {
    this.setState({ isVisibleBack: false })
  };

  handlePickerGo = (date) => {
    this.hidePickerGo();
    this.setState({
      chosenDateGo: moment(date).format('D MMMM YYYY HH:mm')
    })
  };

  handlePickerBack = (date) => {
    this.hidePickerBack();
    this.setState({
      chosenDateBack: moment(date).format('D MMMM YYYY HH:mm')
    })
  };

  render() {
    return (
      <KeyboardShift>
        {() => (
      <Container style={styles.container}>
        <Content>
            <Text style= {styles.title}>Infos de votre annonce</Text>
          <Form>
            <Text note style= {styles.text}>Départ</Text>
            <SearchableDropdown
              onTextChange={(depart) => { console.log(depart) }}
              onItemSelect={depart => this.setState({departCity: depart})}
              containerStyle={{ padding: 5 }}
              textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={items}
              defaultIndex={2}
              placeholder="Départ"
              resetValue={false}
              underlineColorAndroid="transparent"
              />    
            
            <Text note style= {styles.text}>Destination</Text>   
            <SearchableDropdown
              onTextChange={(dest) => { console.log(dest) }}
              onItemSelect={dest => this.setState({destCity: dest})}
              containerStyle={{ padding: 5 }}
              textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={items}
              defaultIndex={2}
              placeholder="Destination"
              resetValue={false}
              underlineColorAndroid="transparent"
              />

            
            <TouchableOpacity onPress={this.showPickerGo} style= {styles.text}>
              <Text><Icon name="clock" /> Date et heure aller</Text>
              <Text style={{color: "blue", fontSize:15}}>{this.state.chosenDateGo}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isVisibleGo}
              onConfirm={this.handlePickerGo}
              onCancel={this.hidePickerGo}
              mode={"datetime"}
            />

            <TouchableOpacity onPress={this.showPickerBack} style= {styles.text}>
              <Text><Icon name="clock" /> Date et heure retour</Text>
              <Text style={{color: "blue", fontSize:15}}>{this.state.chosenDateBack}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isVisibleBack}
              onConfirm={this.handlePickerBack}
              onCancel={this.hidePickerBack}
              mode={"datetime"}
            />
            <Text note style= {styles.text}>Nombre de places    {this.state.nbrplaces}</Text>
            <Slider
              value={this.state.nbrplaces}
              onValueChange={nbrplaces => this.setState({nbrplaces})}
              minimumValue= {1}
              maximumValue= {4}
              step= {1}
            />
            <Input
              placeholder="Prix par palce"
            />
            
            <Button
              rounded
              block
              primary 
              onPress= {() => 0}
            >
              <Text style={{color: 'white'}}>Continuer</Text>
            </Button> 
          </Form>
          </Content>
        </Container>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  text: {
    marginTop: 15,
  },

  title: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 26,
    color: '#3f51b5',
  },

  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  butt: {
    marginTop: 30,
  },
});