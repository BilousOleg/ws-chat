const { Server } = require('socket.io');
const messageHandler = require('./handlers/messageHandler');
const {
  SOCKET_EVENTS: {
    CREATE_MESSAGE: { CREATE_MESSAGE },
    DELETE_MESSAGE: { DELETE_MESSAGE },
  },
} = require('../constants');

const initSocket = httpServer => {
  const io = new Server(httpServer, { cors: { origin: '*' } });
  const { createMessage, deleteMessage } = messageHandler(io);

  const onConnection = socket => {
    socket.on(CREATE_MESSAGE, payload => {
      createMessage(socket, payload);
    });
    socket.on(DELETE_MESSAGE, payload => {
      deleteMessage(socket, payload);
    });
  };

  io.on('connection', onConnection);
};

module.exports = initSocket;
