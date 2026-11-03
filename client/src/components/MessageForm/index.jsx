import { Formik, Form, Field } from 'formik';
import { ws } from '../../api';

function MessageForm () {
  const addMessage = (values, formikBag) => {
    ws.createMessage(values);
    formikBag.resetForm();
  };

  const initialValues = {
    body: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={addMessage}>
      <Form>
        <Field name='body' />
        <button type='submit'>Send</button>
      </Form>
    </Formik>
  );
}

export default MessageForm;
