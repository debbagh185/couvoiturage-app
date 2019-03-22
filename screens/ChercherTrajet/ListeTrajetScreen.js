import React, { Component } from 'react';
import {Text, View} from 'react-native';
import store from '../../store/configureStore'
import {Container,Content} from 'native-base'


 

export default class ListeTrajetScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            res: JSON.stringify(store.getState().Trajet.SearchResult)
        }
        alert(this.state.res)
    }
    render() {
        
        return(
            <View style={{flex:1}}>
                <Container>
                    <Content>
                        
                    </Content>
                </Container>
            </View>
            )
    }
}