import React from 'react';
import * as yup from 'yup';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

import Button from './Button';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

export const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.containerBackground,
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
  },
});

const validationSchema = yup.object({
  username: yup
    .string()
    .min(1, 'Username is too short')
    .max(30, 'Username is too long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password is too short')
    .max(50, 'Password is too long')
    .required('Password is required'),
  passwordConfirmation: yup
    .mixed()
    // Value reference for comparison
    // https://github.com/jquense/yup#mixedoneofarrayofvalues-arrayany-message-string--function-schema-alias-equals
    // Make a reference to value 'password' field and compare the value
    .oneOf([yup.ref('password')], 'Does not match to password')
    .required('Password confirmation is required'),
});

const initialValues = { username: '', password: '', passwordConfirmation: '' };

const SignUpForm = ({ onSubmit }) => (
  <View style={styles.formContainer}>
    <FormikTextInput
      name="username"
      placeholder="Username"
      testID="usernameField"
    />
    <FormikTextInput
      name="password"
      placeholder="Password"
      secureTextEntry
      testID="passwordField"
    />
    <FormikTextInput
      name="passwordConfirmation"
      placeholder="Password confirmation"
      secureTextEntry
      testID="passwordField"
    />
    <Button onPress={onSubmit} testID="submitButton" title="Sign up" />
  </View>
);

const SignUpContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
  </Formik>
);

const SignUp = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();

  const onSubmit = async ({ username, password }) => {
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
