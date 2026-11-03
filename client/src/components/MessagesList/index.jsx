import { useLayoutEffect } from 'react';
import MessagesListItem from './MessagesListItem';

function MessagesList ({ messages, isFetching, error, onDelete, onEdit }) {
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
      {messages.map(message => (
        <MessagesListItem
          key={message._id}
          message={message}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ol>
  );
}

export default MessagesList;
