import React from 'react';
import { FlatList } from 'react-native';
import ItemSeparator from './ItemSeparator';

import Review from './Review';

const ReviewList = ({
  renderItem = ({ item }) => <Review {...item} />,
  reviews,
  onEndReachedThreshold = 0.8,
  onEndReached,
}) => (
  <FlatList
    data={reviews}
    ItemSeparatorComponent={ItemSeparator}
    onEndReachedThreshold={onEndReachedThreshold}
    onEndReached={onEndReached}
    renderItem={renderItem}
    keyExtractor={({ id }) => id}
  />
);

export default ReviewList;
