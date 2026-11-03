const { Message } = require('../../models');
const {
  SOCKET_EVENTS: {
    CREATE_MESSAGE: { CREATE_MESSAGE_SUCCESS, CREATE_MESSAGE_ERROR },
    DELETE_MESSAGE: { DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_ERROR },
    UPDATE_MESSAGE: { UPDATE_MESSAGE_SUCCESS, UPDATE_MESSAGE_ERROR },
  },
} = require('../../constants');

module.exports = io => {
  const createMessage = async (socket, payload) => {
    try {
      const createdMessage = await Message.create(payload);

      io.emit(CREATE_MESSAGE_SUCCESS, createdMessage);
    } catch (err) {
      socket.emit(CREATE_MESSAGE_ERROR, {
        error: err.message ?? 'Failed to create message',
      });
    }
  };

  const deleteMessage = async (socket, id) => {
    try {
      const deletedMessage = await Message.findByIdAndDelete(id);

      io.emit(DELETE_MESSAGE_SUCCESS, deletedMessage);
    } catch (err) {
      socket.emit(DELETE_MESSAGE_ERROR, {
        error: err.message ?? 'Failed to delete message',
      });
    }
  };

  const updateMessage = async (socket, { id, values: { body } }) => {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        id,
        { $set: { body } },
        {
          returnDocument: 'after',
          runValidators: true,
        }
      );

      console.log(updatedMessage);

      io.emit(UPDATE_MESSAGE_SUCCESS, updatedMessage);
    } catch (err) {
      socket.emit(UPDATE_MESSAGE_ERROR, {
        error: err.message ?? 'Failed to update message',
      });
    }
  };

  return {
    createMessage,
    deleteMessage,
    updateMessage,
  };
};
