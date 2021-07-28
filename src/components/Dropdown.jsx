import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import theme from '../theme';

const styles = StyleSheet.create({
  inputIOS: {
    backgroundColor: theme.colors.containerBackground,
    borderRadius: 5,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    paddingHorizontal: 16,
    paddingRight: 32,
    paddingVertical: 16,
    shadowColor: theme.colors.barBackground,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  inputAndroid: {
    backgroundColor: theme.colors.containerBackground,
    borderRadius: 5,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    paddingHorizontal: 16,
    paddingRight: 32,
    paddingVertical: 16,
    shadowColor: theme.colors.barBackground,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});

const Dropdown = ({ items, onValueChange }) => (
  <RNPickerSelect
    items={items}
    onValueChange={onValueChange}
    style={styles}
    useNativeAndroidPickerStyle={false}
  />
);

export default Dropdown;
