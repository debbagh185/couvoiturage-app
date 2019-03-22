import React from "react";

import { GiftedChat } from "react-native-gifted-chat";
import KeyboardShift from '../components/KeyboardShift';
import Backend from '../components/Backend'


export default class ChatScreen extends React.Component {
  state = {
    messages: []
  };
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
