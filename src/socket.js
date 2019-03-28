import io from 'socket.io-client';

const socket = io('http://omar-pc:4000');

export const configureSocket = dispatch => {
  socket.on('connect', () => {
    dispatch('connect', socket.id);
    console.log('connect', socket.id);
  });

  socket.on('CONNECTED_USERS', users => {
    // app should display connected users
    dispatch('CONNECTED_USERS', users);
    console.log('CONNECTED_USERS', users);
  });

  socket.on('SENT_MESSAGES', messages => {
    // app should display previosly sent messages
    dispatch('SENT_MESSAGES', messages);
    console.log('SENT_MESSAGES', messages);
  });

  socket.on('NEW_USER', user => {
    // app should store the user
    dispatch('NEW_USER', user);
    console.log('NEW_USER', user);
  });

  socket.on('USER_ID', id => {
    // id === socket.id
    dispatch('USER_ID', id);
    console.log('USER_ID', id);
  });

  socket.on('NEW_MESSAGE', message => {
    // app should store the message
    dispatch('NEW_MESSAGE', message);
    console.log('NEW_MESSAGE', message);
  });

  socket.on('MESSAGE_DETAILS', message => {
    // app should update the message
    dispatch('MESSAGE_DETAILS', message);
    console.log('MESSAGE_DETAILS', message);
  });

  socket.on('USER_DISCONNECTED', user => {
    // app should remove this user
    dispatch('USER_DISCONNECTED', user);
    console.log('USER_DISCONNECTED', user);
  });

  return socket;
};

export const emitNewUser = fullname => socket.emit('NEW_USER', fullname);

export const emitNewMessage = text => socket.emit('NEW_MESSAGE', text);
