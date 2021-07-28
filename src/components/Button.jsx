import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    display: 'flex',
    padding: 15,
  },
  colorPrimary: {
    backgroundColor: theme.colors.primary,
  },
  colorDelete: {
    backgroundColor: theme.colors.delete,
  },
  title: {
    color: '#ffffff',
  },
});

const Button = ({ color, onPress, testID, title, style }) => {
  const buttonStyle = [
    styles.container,
    color === 'primary' && styles.colorPrimary,
    color === 'delete' && styles.colorDelete,
    style,
  ].filter(Boolean);
  return (
    <TouchableOpacity testID={testID} onPress={onPress}>
      <View style={buttonStyle}>
        <Text fontWeight="bold" style={styles.title}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
