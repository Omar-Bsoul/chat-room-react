import React, { Component } from 'react';
import {
  Paper,
  Avatar,
  IconButton,
  InputBase,
  Divider
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import SendIcon from '@material-ui/icons/SendOutlined';

class MessageInput extends Component {
  state = {
    text: ''
  };

  handleMessageChanged = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleSendMessage = text => {
    if (text && text.trim() !== '') {
      this.props.onSend(text);
      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state;
    const { fullname } = this.props.user;

    return (
      <Paper
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}
        elevation={0}
      >
        <Avatar style={{ margin: 8, backgroundColor: red[600] }}>
          {fullname.split(' ')[0][0].toUpperCase()}
          {fullname.split(' ')[1][0].toUpperCase()}
        </Avatar>
        <InputBase
          style={{ marginLeft: 8, marginRight: 8, flex: 1 }}
          onChange={this.handleMessageChanged}
          placeholder="Type a message..."
          value={text}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.handleSendMessage(text);
              event.preventDefault();
            }
          }}
        />
        <Divider
          style={{
            width: 1,
            height: 64
          }}
        />
        <IconButton
          color="primary"
          style={{ marginLeft: 8 }}
          aria-label="Send"
          onClick={() => this.handleSendMessage(text)}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default MessageInput;
