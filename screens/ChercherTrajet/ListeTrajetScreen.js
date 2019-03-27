import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';
import store from '../../store/configureStore'
import {Container,Content,Card,CardItem,Body,Text,Thumbnail, Right, Footer, FooterTab, Icon, Button} from 'native-base'
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {StoreClickedAd} from '../../actions/RouterActions';
import profil from '../../assets/images/anonymous.png'

 

class ListeTrajetScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            res: JSON.parse(JSON.stringify(store.getState().Trajet.SearchResult))
        }

        /*this.state.res.sort(function(a,b){
            var c = new Date(a["pathData"]["jourAller"]+" "+a["pathData"]["heureAller"]);
            var d = new Date(b["pathData"]["jourAller"]+" "+b["pathData"]["heureAller"]);
            return d-c;
        });*/

        console.log(this.state.res)
    }

render() {

        let ads = (!this.state.res.length) ?  
            <CardItem header bordered style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                <Text style={{color:'red'}}>Aucune annonce disponible selon vos recherche!</Text>
            </CardItem> : 
            this.state.res.map(path => {
            return (
            <View key={path["path_id"]} style={{flex:1}}>
            <Card>
                <CardItem header bordered style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <Text>{(path["pathData"]["depart"])["name"].toUpperCase()} à {(path["pathData"]["destination"])["name"].toUpperCase()} le {path["pathData"]["dateAller"]}</Text>
                </CardItem>
            </Card>
                
                {path["ads"].map(ad => {
                  return(    
                        <Card style={{ borderRadius: 8,backgroundColor: "transparent" }}>
                            <CardItem header bordered style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                                <Text>Prix: {ad["prixParPlace"]} Dh</Text>
                                </CardItem> 
                            <TouchableOpacity onPress={() => {
                                this.props.storeClickedAd(ad)
                                Actions._adDetails()
                            }}>  
                            <CardItem style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}} bordered>
                            <Body>
                                <Text>
                                NativeBase is a free and open source framework that enable
                                developers to build
                                high-quality mobile apps using React Native iOS and Android
                                apps
                                with a fusion of ES6.
                                </Text>
                            </Body>
                            </CardItem>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>Actions._userProfil()}>
                                <CardItem bordered>
                                    <Body>
                                        <Thumbnail large source={profil} />
                                    </Body>
                                    <Right>
                                        <Text>{ad["userData"]["lastName"]} {ad["userData"]["firstName"]}</Text>
                                    </Right>
                                </CardItem>
                            </TouchableOpacity>
                                
                            <CardItem footer bordered style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                            <Text>Date de roteur: {ad["dateBack"]}</Text>
                            </CardItem>
                        </Card>
                    
                    )
                
                })}
            </View>
            
            )
        });

        return(
            <View style={{flex:1}}>
                <Container>
                    <Content padder>
                         {ads}
                    </Content>
                </Container>
                <Footer>
                    <FooterTab>
                    <Button onPress={()=> Actions._chercher() } vertical>
                        <Icon name="arrow-back" />
                    </Button>
                    </FooterTab>
                </Footer>
            </View>
            )
    }
}


const mapDispatchToProps = (dispatch) => {
    return { 
        storeClickedAd: (ad) => dispatch(StoreClickedAd(ad)),
    };
  }
  
export default connect(null,mapDispatchToProps)(ListeTrajetScreen);