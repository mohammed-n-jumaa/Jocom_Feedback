import * as yup from 'yup';

/**
 * Login validation schema
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

/**
 * Question validation schema
 */
export const questionSchema = yup.object().shape({
  question_text: yup.object().shape({
    en: yup.string().required('English question is required'),
    ar: yup.string().required('Arabic question is required'),
  }),
  question_type: yup.string().required('Question type is required'),
  departments: yup
    .array()
    .min(1, 'Select at least one department')
    .required('Departments are required'),
  emojis: yup
    .array()
    .min(1, 'Select at least one emoji')
    .required('Emojis are required'),
  is_required: yup.boolean(),
  order: yup.number().integer().min(1),
  options: yup.array().when('question_type', {
    is: (val) => ['single_choice', 'multiple_choice'].includes(val),
    then: (schema) =>
      schema
        .of(
          yup.object().shape({
            en: yup.string().required('English option is required'),
            ar: yup.string().required('Arabic option is required'),
          })
        )
        .min(2, 'At least 2 options are required'),
    otherwise: (schema) => schema.nullable(),
  }),
  range_config: yup.object().when('question_type', {
    is: 'range_slider',
    then: (schema) =>
      schema.shape({
        min: yup.number().required('Minimum value is required'),
        max: yup.number().required('Maximum value is required'),
        step: yup.number().required('Step value is required'),
      }),
    otherwise: (schema) => schema.nullable(),
  }),
});

/**
 * User validation schema
 */
export const userSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .when('isEdit', {
      is: false,
      then: (schema) => schema.required('Password is required'),
      otherwise: (schema) => schema.nullable(),
    }),
  role: yup
    .string()
    .oneOf(['admin', 'user'], 'Invalid role')
    .required('Role is required'),
});

/**
 * Feedback validation schema
 */
export const feedbackSchema = yup.object().shape({
  answers: yup.array().of(
    yup.object().shape({
      question_id: yup.number().required(),
      answer: yup.mixed().required('This field is required'),
    })
  ),
  contact: yup.object().shape({
    email: yup.string().email('Invalid email address').nullable(),
    phone: yup
      .string()
      .matches(/^(07\d{8}|\+9627\d{8})$/, 'Invalid phone number')
      .nullable(),
  }),
});