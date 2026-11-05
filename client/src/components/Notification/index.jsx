import { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { hideNotification } from '../../store/slices/notificationSlice';
import styles from './Notification.module.sass';

function Notification ({ message, type, isVisible, onClose }) {
  useEffect(() => {
    if (!isVisible) return;

    const timerId = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isVisible, onClose]);

  return (
    <div
      className={classNames(styles.notification, styles[type], {
        [styles.isActive]: isVisible,
      })}
    >
      <span>{message}</span>

      <button className={styles.closeBtn} onClick={onClose}>
        x
      </button>
    </div>
  );
}

const mapStateToProps = ({ notification }) => notification;
const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(hideNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
