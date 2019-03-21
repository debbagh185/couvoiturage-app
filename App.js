import React from 'react';
import MainComponent from './MainComponent';
import {Provider} from 'react-redux'
import store from './store/configureStore'

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state=({
      isReady: false,
    })
    
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
    }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
      }
    return (  
      <Provider store={store}>
        <MainComponent />
      </Provider>   
      
    );
  }
}

