import { Formik, Form, Field, ErrorMessage } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import { MESSAGE_VALIDATION_SCHEMA } from '../../utils/validationSchemas';
import styles from './MessageForm.module.sass';

function MessageForm ({ initialValues, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={MESSAGE_VALIDATION_SCHEMA}
      enableReinitialize
    >
      <Form className={styles.messageForm}>
        <Field
          name='body'
          maxLength={2000}
          placeholder='Enter your message here...'
        />
        <ErrorMessage name='body'>
          {message => <span className={styles.error}>{message}</span>}
        </ErrorMessage>
        <button type='submit'>
          <SendIcon />
        </button>
      </Form>
    </Formik>
  );
}

export default MessageForm;
