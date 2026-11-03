import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMessagesThunk } from './store/slices/messagesSlice';
import MessagesList from './components/MessagesList';
import MessageForm from './components/MessageForm';
import { ws } from './api';
import CONSTANTS from './constants';

const { EMPTY_MESSAGE } = CONSTANTS;

function App ({ messages, isFetching, error, limit, get }) {
  const [messageToUpdate, setMessageToUpdate] = useState(null);

  useEffect(() => {
    get(limit);
  }, [limit, get]);

  const deleteMessageById = id => {
    ws.deleteMessage(id);
  };

  const updateMessageById = message => {
    setMessageToUpdate(message);
  };

  const formInitialValues = messageToUpdate ?? EMPTY_MESSAGE;

  const handleSubmit = (values, { resetForm }) => {
    if (messageToUpdate) {
      ws.updateMessage({
        id: messageToUpdate._id,
        values: { body: values.body },
      });
    } else {
      ws.createMessage({ body: values.body });
    }

    setMessageToUpdate(null);
    resetForm();
  };

  return (
    <>
      <MessagesList
        messages={messages}
        isFetching={isFetching}
        error={error}
        onDelete={deleteMessageById}
        onEdit={updateMessageById}
      />
      <hr />
      <MessageForm initialValues={formInitialValues} onSubmit={handleSubmit} />
    </>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
