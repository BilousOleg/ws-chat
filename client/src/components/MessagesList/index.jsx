import { useLayoutEffect } from 'react';
import MessagesListItem from './MessagesListItem';

function MessagesList ({ messages, isFetching, error, onDelete }) {
  useLayoutEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length]);

  if (error) {
    return <div style={{ color: 'red' }}>ERROR!!!</div>;
  }

  if (isFetching) {
    return <div>Messages are loading. Please, wait...</div>;
  }

  return (
    <ol>
      {messages.map(({ _id, body }) => (
        <MessagesListItem key={_id} id={_id} body={body} onDelete={onDelete} />
      ))}
    </ol>
  );
}

export default MessagesList;
