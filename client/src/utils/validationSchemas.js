import * as yup from 'yup';

export const MESSAGE_VALIDATION_SCHEMA = yup.object({
  body: yup
    .string()
    .trim()
    .required('')
    .max(2000, 'Message cannot exceed 2000 characters'),
});
