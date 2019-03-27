import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardShift from '../components/KeyboardShift';
import Backend from '../components/Backend'
import store from '../store/configureStore'
import {Actions} from 'react-native-router-flux'

export default class ChatScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      messages: []
    };
    if(!store.getState().User.loggedin) Actions._login()
  }
  
  componentWillMount() {}
  render() {
    return (
    <KeyboardShift> 
      {()=>(
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: Backend.getUid(),
          name: 'test'
        }}
      />
      )}
    </KeyboardShift>
    );
  }
  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}
