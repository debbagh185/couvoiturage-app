import React, { Component } from 'react';
import KeyboardShift from '../../components/KeyboardShift';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Form, Icon, Button, Input, Content, Container, Separator, View } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Slider from "react-native-slider";
import {connect} from 'react-redux';
import {proposerAd} from '../../actions/TrajetActions';
import { Actions } from 'react-native-router-flux';
import store from '../../store/configureStore'
 


class ProposerTrajetScreen extends Component {
    constructor(props) {
        super(props)
        if(!store.getState().User.loggedin) Actions._login()
        this.state = {
          isVisibleGo: false,
          isVisibleBack: false,
          ad:{
            prixParPlace:0,
            nbrPlaces:1,
            dateBack: {
              jour: "",
              heure: ""
            }
          }
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
        newPath.dateAller.jour=moment(date).format('D MMMM YYYY');
        newPath.dateAller.heure=moment(date).format('HH:mm');
        this.setState({path: newPath});
      };
    
      handlePickerBack = (date) => {
        this.hidePickerBack();
        let newAd = Object.assign({}, this.state.ad);
        newAd.dateBack.jour=moment(date).format('D MMMM YYYY');
        newAd.dateBack.heure=moment(date).format('HH:mm');
        this.setState({ad: newAd});
      };

  render() {
    return (
      <KeyboardShift> 
        {()=>(
        <View style={{flex:1}}>
        <Container style={{flex:1,justifyContent:'center',padding:50}}>
        <Content>
        <Form>
         <View style={styles.view}>
                <Separator bordered>
                      <Text>Nombre de places {this.state.ad.nbrPlaces}</Text>
                </Separator> 
                <Slider
                value={this.state.ad.nbrPlaces}
                onValueChange={nbrplaces => {
                    let newAd = Object.assign({}, this.state.ad);
                    newAd.nbrPlaces=nbrplaces;
                    this.setState({ad: newAd});
                }}
                minimumValue= {1}
                maximumValue= {4}
                step= {1}
                />
        </View>
        <View style={styles.view}>
                <Separator bordered>
                      <Text>Prix par place</Text>
                </Separator> 
                <Input
                    style={styles.price}
                    placeholder="Ex: 40Dh"
                    onChangeText={(price) => {
                    let newAd = Object.assign({}, this.state.ad);
                    newAd.prixParPlace=price;
                    this.setState({ad: newAd});
                    }}
                />
        </View>
        <View style={styles.view}>
                <TouchableOpacity onPress={this.showPickerBack}>
                <Text><Icon name="clock" /> Date et heure retour</Text>
                <Text style={{color: "blue", fontSize:15}}>{this.state.ad.dateBack.jour} {this.state.ad.dateBack.heure}</Text>
                </TouchableOpacity>
                <DateTimePicker
                isVisible={this.state.isVisibleBack}
                onConfirm={this.handlePickerBack}
                onCancel={this.hidePickerBack}
                mode={"datetime"}
                />
        </View>
            <View style={styles.view}>
                <Button
                    rounded
                    block
                    primary 
                    onPress= {() => {
                        let path = store.getState().Trajet.path;
                        this.props.proposerAd(this.state.ad,path)
                        Actions._proposerSuccess()
                    }}
                    >   
                    <Text style={{color: 'white'}}>Proposer</Text>
                    </Button>
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
  },
  price:{
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  }
});

const mapDispatchToProps = (dispatch) => {
  return { 
    proposerAd : (ad,path) => dispatch(proposerAd(ad,path))
  };
}

export default connect(null,mapDispatchToProps)(ProposerTrajetScreen);