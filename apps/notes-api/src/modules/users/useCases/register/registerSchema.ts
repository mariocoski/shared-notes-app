import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().defined().required().max(255),
  email: yup.string().defined().required().max(255),
  password: yup.string().defined().required().max(255),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;
