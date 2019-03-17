import React from "react";

import { GiftedChat } from "react-native-gifted-chat";
import ChatModel from "../components/Db/ChatModel";

export default class ChatScreen extends React.Component {
  state = {
    messages: []
  };
  componentWillMount() {}
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          ChatModel.sendMessage(message);
        }}
        user={{
          _id: ChatModel.getUid(),
          name: 'test'
        }}
      />
    );
  }
  componentDidMount() {
    ChatModel.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }
  componentWillUnmount() {
    ChatModel.closeChat();
  }
}
