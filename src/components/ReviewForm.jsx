import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import useReview from '../hooks/useReview';

import Button from './Button';
import FormikTextInput from './FormikTextInput';

import { styles as formStyles } from './SignIn';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be at least 0.')
    .max(100, 'Rating must be 100 at most.')
    .integer()
    .required('Rating is required'),
  text: yup.string().notRequired(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '0',
  text: '',
};

const Form = ({ onSubmit }) => (
  <View style={formStyles.formContainer}>
    <FormikTextInput
      name="ownerName"
      placeholder="Repository owner name"
      testID="ownerName"
    />
    <FormikTextInput
      name="repositoryName"
      placeholder="Repository name"
      testID="repositoryName"
    />
    <FormikTextInput
      name="rating"
      placeholder="Rating between 0 and 100"
      testID="rating"
    />
    <FormikTextInput
      multiline
      name="text"
      placeholder="Review"
      testID="reviewText"
    />
    <Button
      testID="reviewFormSubmitButton"
      onPress={onSubmit}
      title="Create a review"
    />
  </View>
);

export const ReviewFormContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
  </Formik>
);

const ReviewForm = () => {
  const history = useHistory();
  const [createReview] = useReview();

  const onSubmit = async (values) => {
    try {
      const id = await createReview({
        ...values,
        rating: Number(values.rating),
      });
      history.push(`/${id}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
