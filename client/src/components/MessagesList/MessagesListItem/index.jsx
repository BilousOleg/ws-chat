import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './MessagesListItem.module.sass';

function MessagesListItem ({ message, onDelete, onEdit }) {
  return (
    <li className={styles.message}>
      <p>{message.body}</p>
      <section className={styles.buttons}>
        <button onClick={() => onDelete(message._id)}>
          <DeleteIcon />
        </button>
        <button onClick={() => onEdit(message)}>
          <EditIcon />
        </button>
      </section>
    </li>
  );
}

export default MessagesListItem;
