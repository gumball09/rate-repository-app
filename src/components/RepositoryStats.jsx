import React from 'react';
import { StyleSheet, View } from 'react-native';

import formatValue from '../utils/formatValue';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
});

const RepositoryStats = ({ data }) => (
  <View style={styles.container}>
    {data.map(({ testID, title, value }) => (
      <View key={title} style={styles.item} testID={testID}>
        <Text fontWeight="bold" style={{ marginBottom: 5 }}>
          {formatValue(value)}
        </Text>
        <Text color="textSecondary">{title}</Text>
      </View>
    ))}
  </View>
);

export default RepositoryStats;
