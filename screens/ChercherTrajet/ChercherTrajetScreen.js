import React, { Component } from 'react'
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Form,Button, Content, Icon, Container, Spinner, Separator, Left, Body} from 'native-base';
import moment from 'moment';
import {connect} from 'react-redux';
import SearchableDropdown from 'react-native-searchable-dropdown'
import objects from '../../constants/objects'
import KeyboardShift from '../../components/KeyboardShift';
import {getAdsResult} from '../../actions/TrajetActions'
import { Actions } from 'react-native-router-flux';
 

//Item array for the dropdown
var items = objects.Cities;

class ChercherTrajetScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      chosenDate: '',
      spinner: <Text style={{color: 'white'}}>Chercher</Text>,
      serverData: [],
      path:{
        departCity: {
          id:"",
          name: "",
          lat: "",
          lng: ""
        },
        destCity: {
          id:"",
          name: "",
          lat: "",
          lng: ""
        },
        dateAller: {
          jour: "",
          heure: ""
        }
      } 
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
    let newPath = Object.assign({}, this.state.path);
    newPath.dateAller.jour=moment(date).format('D MMMM YYYY');
    newPath.dateAller.heure=moment(date).format('HH:mm');
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
              resetValue={false}
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
                  <TouchableOpacity onPress={this.showPicker}>
                    <Left />
                    <Body>
                      <Icon name="clock" />
                      {!this.state.path.dateAller.jour && <Text style={{color: "blue", fontSize:15}}>Selectionner une date</Text>}
                      <Text style={{color: "blue", fontSize:15}}>{this.state.path.dateAller.jour} {this.state.path.dateAller.heure}</Text>
                    </Body>
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={"datetime"}
                  />
            </View>
              
            <View style={styles.view}>
                <Button 
                    rounded
                    block
                    primary 
                    onPress= {() => {
                      //console.log(this.state.path)
                      this.props.getAdsResult(this.state.path)
                      this.setState({spinner: <Spinner color='blue' />})
                      setTimeout(()=>{
                        if(this.props.success) {Actions._list()}
                        else {
                          this.setState({spinner: <Text style={{color: 'white'}}>Chercher</Text>})
                          alert("Problem de connexion internet, réessayer!")
                        }
                      }, 5000);
                    }}
                  >
                  {this.state.spinner}
              </Button>  
          </View>
        
        </View>
        </Form> 
      </Content>
      </Container>
      </View>
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
     Ads: state.Trajet.SearchResult,
     success: state.Trajet.success
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    getAdsResult: (path) => dispatch(getAdsResult(path))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ChercherTrajetScreen);