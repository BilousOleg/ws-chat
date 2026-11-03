const { Server } = require('socket.io');
const messageHandler = require('./handlers/messageHandler');
const {
  SOCKET_EVENTS: {
    CREATE_MESSAGE: { CREATE_MESSAGE },
    DELETE_MESSAGE: { DELETE_MESSAGE },
    UPDATE_MESSAGE: { UPDATE_MESSAGE },
  },
} = require('../constants');

const initSocket = httpServer => {
  const io = new Server(httpServer, { cors: { origin: '*' } });
  const { createMessage, deleteMessage, updateMessage } = messageHandler(io);

  const onConnection = socket => {
    socket.on(CREATE_MESSAGE, payload => {
      createMessage(socket, payload);
    });
    socket.on(DELETE_MESSAGE, id => {
      deleteMessage(socket, id);
    });
    socket.on(UPDATE_MESSAGE, payload => {
      updateMessage(socket, payload);
    });
  };

  io.on('connection', onConnection);
};

module.exports = initSocket;
