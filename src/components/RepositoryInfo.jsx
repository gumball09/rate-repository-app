import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';

import Text from './Text';

const styles = StyleSheet.create({
  flexContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 0,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  image: {
    borderRadius: 5,
    height: 50,
    width: 50,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    flexDirection: 'row',
    flexShrink: 1,
    fontWeight: '500',
    marginTop: 5,
    padding: 5,
  },
});

const RepositoryInfo = ({ image, name, description, language }) => {
  return (
    <View style={styles.flexContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ marginBottom: 5 }}
          testID="repositoryName"
        >
          {name}
        </Text>
        <Text
          color="textSecondary"
          style={{ marginBottom: 5 }}
          testID="repositoryDescription"
        >
          {description}
        </Text>
        <View style={styles.language}>
          <Text
            style={{ color: theme.colors.barText }}
            testID="repositoryLanguage"
          >
            {language}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryInfo;
