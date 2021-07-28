import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';

import useSignIn from '../hooks/useSignIn';
import Button from './Button';

export const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.containerBackground,
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = { username: '', password: '' };

const SignInForm = ({ onSubmit }) => (
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
    <Button onPress={onSubmit} testID="submitButton" title="Sign in" />
  </View>
);

export const SignInContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>
);

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
