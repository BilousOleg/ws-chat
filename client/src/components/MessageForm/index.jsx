import { Formik, Form, Field } from 'formik';

function MessageForm ({ initialValues, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form>
        <Field name='body' />
        <button type='submit'>Send</button>
      </Form>
    </Formik>
  );
}

export default MessageForm;
