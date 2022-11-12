import * as yup from 'yup';

export const shareNoteSchema = yup
  .object()
  .shape({
    noteId: yup.number().required().defined(),
    name: yup.string(),
    email: yup.string(),
  })
  .test('name or email', 'name or email is required', (value) =>
    Boolean(value.name || value.email)
  );

export type ShareNoteSchema = yup.InferType<typeof shareNoteSchema>;
