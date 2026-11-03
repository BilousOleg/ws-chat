function MessagesListItem ({ id, body, onDelete }) {
  return (
    <li key={id}>
      <p>{body}</p>
      <button onClick={() => onDelete(id)}>Del</button>
    </li>
  );
}

export default MessagesListItem;
