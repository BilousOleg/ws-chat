import { useLayoutEffect, useRef } from 'react';
import MessagesListItem from './MessagesListItem';
import styles from './MessagesList.module.sass';

function MessagesList ({ messages, isFetching, onDelete, onEdit }) {
  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages.length]);

  if (isFetching) {
    return <div>Messages are loading. Please, wait...</div>;
  }

  return (
    <ol className={styles.messagesList}>
      {messages.map(message => (
        <MessagesListItem
          key={message._id}
          message={message}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      <li ref={messagesEndRef} />
    </ol>
  );
}

export default MessagesList;
