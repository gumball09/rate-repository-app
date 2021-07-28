import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import Button from './Button';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import useDeleteReview from '../hooks/useDeleteReview';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  ratingContainer: {
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 50 / 2,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  reviewContainer: {
    backgroundColor: theme.colors.containerBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    paddingBottom: 12,
  },
  buttonContainer: {
    backgroundColor: theme.colors.containerBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 16,
  },
  textContainer: {
    display: 'flex',
    flexShrink: 1,
    flexDirection: 'column',
    paddingLeft: 16,
  },
  text: {
    marginBottom: 4,
  },
});

const Review = ({ createdAt, rating, text, heading }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingContainer}>
      <Text color="primary" fontSize="subheading" fontWeight="bold">
        {rating}
      </Text>
    </View>
    <View style={styles.textContainer}>
      <Text fontWeight="bold" style={styles.text}>
        {heading}
      </Text>
      <Text color="textSecondary" style={styles.text}>
        {format(new Date(createdAt), 'dd.MM.yyyy')}
      </Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  </View>
);

export const ReviewWithButtons = (props) => {
  const { id, refetch, repositoryId } = props;
  const history = useHistory();

  const [deleteReview] = useDeleteReview();

  const onViewPress = () => history.push(`/${repositoryId}`);

  const onDeletePress = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview({ id });
            refetch();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <Review {...props} />
      <View style={styles.buttonContainer}>
        <Button onPress={onViewPress} title="View repository" />
        <Button color="delete" onPress={onDeletePress} title="Delete review" />
      </View>
    </>
  );
};

export default Review;
