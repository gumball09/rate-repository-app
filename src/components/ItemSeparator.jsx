import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;
