import React, { Component } from 'react';
import {
  Drawer,
  Hidden,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { animateScroll as scroll } from 'react-scroll';
import NameDialog from './components/nameDialog';
import MessageInput from './components/messageInput';
import DrawerContent from './components/drawerContent';
import Chat from './components/chat';

import './App.css';

import { configureSocket, emitNewUser, emitNewMessage } from './socket';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: '#ffffff',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    top: 'auto',
    bottom: 0
  },
  menuButton: {
    color: '#808080',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class App extends Component {
  socket = configureSocket((event, data) => {
    switch (event) {
      case 'connect':
        break;
      case 'CONNECTED_USERS':
        this.setState({ users: data });
        break;

      case 'SENT_MESSAGES':
        this.setState({ messages: data });
        setTimeout(() => scroll.scrollToBottom(), 250);
        break;
      case 'NEW_USER':
        {
          const users = [...this.state.users];
          users.push(data);
          this.setState({ users });
        }
        break;
      case 'USER_ID':
        this.setState({ user: data, loading: false });
        break;
      case 'NEW_MESSAGE':
      case 'MESSAGE_DETAILS':
        {
          const messages = [...this.state.messages];
          messages.push(data);
          this.setState({ messages });
          scroll.scrollToBottom();
        }
        break;
      case 'USER_DISCONNECTED':
        {
          const users = [...this.state.users].filter(
            user => user.id !== data.id
          );
          this.setState({ users });
        }
        break;

      default:
        break;
    }
  });

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true,
      mobileOpen: false,
      messages: [],
      users: []
    };

    const fullname = localStorage.getItem('USER_FULLNAME');

    if (fullname) {
      emitNewUser(fullname);
    } else {
      this.state.loading = false;
    }
  }

  onNameSelected = fullname => {
    emitNewUser(fullname);
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  onSend = text => {
    console.log(text);

    emitNewMessage(text);
  };

  render() {
    const { messages, user, users, loading } = this.state;
    const { classes, theme } = this.props;

    if (loading) {
      return (
        <div className="App-header">
          <CircularProgress color="secondary" />
        </div>
      );
    }

    if (!user) {
      return (
        <div className="App-header">
          <NameDialog className="App-header" onDone={this.onNameSelected} />
        </div>
      );
    }

    const drawer = (
      <div style={{ width: this.state.drawerWidth }}>
        <DrawerContent users={users} />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <MessageInput user={user} onSend={this.onSend} />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <Chat messages={messages} className="chat" />
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
