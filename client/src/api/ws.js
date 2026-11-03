import { io } from 'socket.io-client';
import {
  setSocketError,
  createMessageSuccess,
  deleteMessageSuccess,
  updateMessageSuccess,
} from '../store/slices/messagesSlice';
import CONSTANTS from './../constants';

const {
  SOCKET_EVENTS: {
    CREATE_MESSAGE: {
      CREATE_MESSAGE,
      CREATE_MESSAGE_SUCCESS,
      CREATE_MESSAGE_ERROR,
    },
    DELETE_MESSAGE: {
      DELETE_MESSAGE,
      DELETE_MESSAGE_SUCCESS,
      DELETE_MESSAGE_ERROR,
    },
    UPDATE_MESSAGE: {
      UPDATE_MESSAGE,
      UPDATE_MESSAGE_SUCCESS,
      UPDATE_MESSAGE_ERROR,
    },
  },
} = CONSTANTS;

const socket = io('ws://localhost:5000');

export const createMessage = payload => socket.emit(CREATE_MESSAGE, payload);

export const deleteMessage = id => socket.emit(DELETE_MESSAGE, id);

export const updateMessage = payload => socket.emit(UPDATE_MESSAGE, payload);

export const bringStoreToSocket = store => {
  socket.on(CREATE_MESSAGE_SUCCESS, payload => {
    store.dispatch(createMessageSuccess(payload));
  });
  socket.on(CREATE_MESSAGE_ERROR, error => {
    store.dispatch(setSocketError(error));
  });
  socket.on(DELETE_MESSAGE_SUCCESS, payload => {
    store.dispatch(deleteMessageSuccess(payload));
  });
  socket.on(DELETE_MESSAGE_ERROR, error => {
    store.dispatch(setSocketError(error));
  });
  socket.on(UPDATE_MESSAGE_SUCCESS, payload => {
    store.dispatch(updateMessageSuccess(payload));
  });
  socket.on(UPDATE_MESSAGE_ERROR, error => {
    store.dispatch(setSocketError(error));
  });
};
