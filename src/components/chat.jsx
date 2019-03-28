import React, { Component } from 'react';
import { GridList } from '@material-ui/core';
import Message from './message';

class Chat extends Component {
  render() {
    const { messages } = this.props;

    return (
      <GridList
        style={{
          margin: 0,
          width: '100%'
        }}
      >
        {messages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}
      </GridList>
    );
  }
}

export default Chat;
