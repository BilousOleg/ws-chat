const { Message } = require('../../models');
const {
  SOCKET_EVENTS: {
    CREATE_MESSAGE: { CREATE_MESSAGE_SUCCESS, CREATE_MESSAGE_ERROR },
    DELETE_MESSAGE: { DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_ERROR },
  },
} = require('../../constants');

module.exports = io => {
  const createMessage = async (socket, payload) => {
    try {
      const createdMessage = await Message.create(payload);

      io.emit(CREATE_MESSAGE_SUCCESS, createdMessage);
    } catch (err) {
      socket.emit(CREATE_MESSAGE_ERROR, {
        error: err.message ?? 'Error',
      });
    }
  };

  const deleteMessage = async (socket, payload) => {
    try {
      const deletedMessage = await Message.findByIdAndDelete(payload);

      io.emit(DELETE_MESSAGE_SUCCESS, deletedMessage);
    } catch (err) {
      socket.emit(DELETE_MESSAGE_ERROR, {
        error: err.message ?? 'Error',
      });
    }
  };

  return {
    createMessage,
    deleteMessage,
  };
};
