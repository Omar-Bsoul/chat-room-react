import React, { Component } from 'react';
import { Paper, Divider, List, ListItem, Avatar } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import PeopleIcon from '@material-ui/icons/SupervisorAccountOutlined';

class DrawerContent extends Component {
  render() {
    const { users } = this.props;

    return (
      <React.Fragment>
        <Paper
          elevation={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 8,
            color: '#808080'
          }}
        >
          <PeopleIcon />
          <h3 style={{ marginLeft: 8 }}>Connected People</h3>
        </Paper>
        <Divider
          style={{
            height: 1,
            width: '100%'
          }}
        />
        {users.length > 0 ? (
          <List component="nav">
            {users.map(user => (
              <ListItem key={user.id} button>
                <Avatar style={{ backgroundColor: red[600], marginRight: 16 }}>
                  {user.fullname.split(' ')[0][0].toUpperCase()}
                  {user.fullname.split(' ')[1][0].toUpperCase()}
                </Avatar>
                <h5
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    marginRight: 8
                  }}
                >
                  {user.fullname}
                </h5>
              </ListItem>
            ))}
          </List>
        ) : (
          <h5
            style={{
              color: '#808080',
              marginRight: 8,
              marginLeft: 8,
              marginTop: 32,
              textAlign: 'center'
            }}
          >
            No one connected yet!
          </h5>
        )}
      </React.Fragment>
    );
  }
}

export default DrawerContent;
