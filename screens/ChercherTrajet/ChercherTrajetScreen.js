import React, { Component } from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Form,Button, Content, Icon, Container} from 'native-base';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import SearchableDropdown from 'react-native-searchable-dropdown'
import objects from '../../constants/objects'
import KeyboardShift from '../../components/KeyboardShift';

//Item array for the dropdown
var items = objects.Cities;

class ChercherTrajetScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      chosenDate: '',
      serverData: [],
      departCity: {},
      destCity: {}
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
      <KeyboardShift> 
        {()=>(
        <Container style={styles.container}>
        <Content>
        <Text style={styles.text}>Trouver un trajet</Text>
        <Form>
          <Text note>Départ</Text>
            <SearchableDropdown
              onTextChange={(depart) => {
                console.log(depart)
              }}
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
          <Text note>Destination</Text>   
          <SearchableDropdown
              onTextChange={(dest) => {
                console.log(dest)
              }}
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

        <TouchableOpacity onPress={this.showPicker} style= {styles.text}>
            <Text><Icon name="clock" /> Date et heure</Text>
            <Text style={{color: "blue", fontSize:15}}>{this.state.chosenDate}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={"datetime"}
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

const mapStateToProps = (state) => {
  return { 
     
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
     
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ChercherTrajetScreen);