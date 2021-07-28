import React from 'react';
import { View } from 'react-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import { ReviewWithButtons } from './Review';
import ReviewList from './ReviewList';

const UserReviews = () => {
  const [authorized, data, handleFetchMore, refetch] = useAuthorizedUser(true);

  const reviews = data
    ? data.authorizedUser.reviews.edges
        .map((edge) => edge.node)
        .map((review) => ({ ...review, heading: review.repository.fullName }))
    : [];

  return (
    <View>
      <ReviewList
        onEndReached={handleFetchMore}
        renderItem={({ item }) => (
          <ReviewWithButtons {...item} refetch={refetch} />
        )}
        reviews={reviews}
      />
    </View>
  );
};

export default UserReviews;
