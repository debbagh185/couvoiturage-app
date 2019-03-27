import React, { Component } from 'react';
import KeyboardShift from '../../components/KeyboardShift'
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Form, Icon, Button,Content, Container, Separator, Left, Body, View, Footer, FooterTab} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {connect} from 'react-redux';
import {StorePathObject} from '../../actions/TrajetActions';
import { Actions } from 'react-native-router-flux';
import objects from '../../constants/objects'
import store from '../../store/configureStore'
 
 
items=objects.Cities;

class ProposerTrajetScreen extends Component {

  constructor(props) {
    super(props)
    if(!store.getState().User.loggedin) Actions._login()
    this.state = {
      isVisibleGo: false,
      isVisibleBack: false,
      path:{
        departCity: {},
        destCity: {},
        dateAller: ""
      }
    }
  }

  componentWillMount(){
    if( JSON.stringify(store.getState().Trajet.path) !== JSON.stringify({}) ) {
      this.setState({path : store.getState().Trajet.path});
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
    let newPath = Object.assign({}, this.state.path);
    moment.locale('fr');
    newPath.dateAller=moment(date).format('D MMMM YYYY HH:mm');
    this.setState({path: newPath});
  };


  render() {
    return (
      <KeyboardShift> 
        {()=>(
        <View style={{flex:1}}>
        <Container style={{flex:1,justifyContent:'center',padding:50}}>
        <Content>
        <Form>
          <View>
            <View style={styles.view}>
                <Separator bordered>
                      <Text>Départ</Text>
                </Separator> 
                  <SearchableDropdown
                    onTextChange={(depart) => {
                      console.log(depart)
                    }}
                    onItemSelect={depart => {
                      let newPath = Object.assign({}, this.state.path);
                      newPath.departCity=depart;
                      this.setState({path: newPath})
                      
                  }}
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
                    resetValue={true}
                    underlineColorAndroid="transparent"
                    />    
            </View>
            <View style={styles.view}>
                <Separator bordered>
                      <Text>Destination</Text>
                </Separator>  
                <SearchableDropdown
                    onTextChange={(dest) => {
                      console.log(dest)
                    }}
                    onItemSelect={dest => {
                      let newPath = Object.assign({}, this.state.path);
                      newPath.destCity=dest;
                      this.setState({path:newPath})
                    
                    }}
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

            </View>

            <View style={styles.view}>
                  <Separator bordered>
                      <Text>Date d'aller</Text>
                  </Separator>
                  <TouchableOpacity onPress={this.showPickerGo}>
                    <Left />
                    <Body>
                      <Icon name="clock" />
                      {!this.state.path.dateAller.jour && <Text style={{color: "blue", fontSize:15}}>Selectionner une date</Text>}
                      <Text style={{color: "blue", fontSize:15}}>{this.state.path.dateAller}</Text>
                    </Body>
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isVisibleGo}
                    onConfirm={this.handlePickerGo}
                    onCancel={this.hidePickerGo}
                    mode={"datetime"}
                    minimumDate={new Date()}
          
                  />
            </View>
              
            <View style={styles.view}>
             <Button
                  rounded
                  block
                  primary 
                  onPress= {() => {
                        this.props.storePathObject(this.state.path);
                        Actions._proposer2()
                      }}
              >
              <Text style={{color: 'white'}}>Continuer</Text>
              </Button>
            </View>
        
        </View>
        </Form> 
      </Content>
      </Container>
      <Footer>
        <FooterTab>
          <Button onPress={()=> Actions.pop() } vertical>
            <Icon name="arrow-back" />
          </Button>
        </FooterTab>
        </Footer>
      </View>
      )}
    </KeyboardShift>
    );
  }
}


const styles = StyleSheet.create({
  item: {
    width: 280,
  },

  text: {
    padding: 40,
    fontSize: 20,
    color:'blue'
  },

  butt: {
    marginTop: 60,
  },
  view:{
    marginBottom: 10,
  }
});

const mapDispatchToProps = (dispatch) => {
  return { 
    storePathObject: (path) => dispatch(StorePathObject(path)),
    changePreviousPage: (page) => dispatch(changePage(page))
  };
}

export default connect(null,mapDispatchToProps)(ProposerTrajetScreen);