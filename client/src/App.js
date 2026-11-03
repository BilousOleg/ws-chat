import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMessagesThunk } from './store/slices/messagesSlice';
import MessagesList from './components/MessagesList';
import MessageForm from './components/MessageForm';
import { ws } from './api';

function App ({ messages, isFetching, error, limit, get }) {
  useEffect(() => {
    get(limit);
  }, [limit, get]);

  const deleteMessageById = id => {
    ws.deleteMessage(id);
  };

  return (
    <>
      <MessagesList
        messages={messages}
        isFetching={isFetching}
        error={error}
        onDelete={deleteMessageById}
      />
      <hr />
      <MessageForm />
    </>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
