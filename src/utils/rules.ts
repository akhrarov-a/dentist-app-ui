import { RuleObject } from 'rc-field-form/es/interface';
import { string } from 'yup';

const whitespace = (
  message = 'Should not start or end with a space'
): RuleObject => ({
  whitespace: true,
  validator: (rule, value = '') =>
    !!value
      ? value.toString().startsWith(' ') || value.toString().endsWith(' ')
        ? Promise.reject()
        : Promise.resolve()
      : Promise.resolve(),
  message
});

const required = (message = 'Required'): RuleObject => ({
  required: true,
  message
});

const email = (message = 'Must be valid email'): RuleObject => ({
  validator: async (rule, value) => {
    if (!value?.length) return Promise.resolve();

    return !string().email().isValidSync(value)
      ? Promise.reject()
      : Promise.resolve();
  },
  message
});

export const rules = {
  whitespace,
  required,
  email
};
