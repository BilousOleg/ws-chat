function MessagesListItem ({ message, onDelete, onEdit }) {
  return (
    <li>
      <p>{message.body}</p>
      <button onClick={() => onDelete(message._id)}>Del</button>
      <button onClick={() => onEdit(message)}>Upd</button>
    </li>
  );
}

export default MessagesListItem;
