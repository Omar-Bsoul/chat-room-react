import React, { Component } from 'react';
import {
  ListItem,
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  withMobileDialog
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import dateformat from 'dateformat';

class Message extends Component {
  render() {
    const { text, sender, time } = this.props.message;
    if (!sender) {
      return null;
    }

    return (
      <ListItem>
        <Card style={{ width: '100%' }}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: red[600] }}>
                {sender.fullname.split(' ')[0][0].toUpperCase()}
                {sender.fullname.split(' ')[1][0].toUpperCase()}
              </Avatar>
            }
            title={sender.fullname}
            subheader={dateformat(time, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
          />
          <CardContent>
            <Typography component="p" style={{ wordBreak: 'break-all' }}>
              {text}
            </Typography>
          </CardContent>
        </Card>
      </ListItem>
    );
  }
}

export default withMobileDialog()(Message);
