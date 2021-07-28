import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import useSignOut from '../hooks/useSignOut';
import theme from '../theme';
import Text from './Text';

const SignOut = () => {
  const [signOut] = useSignOut();
  return (
    <View>
      <TouchableHighlight onPress={signOut}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ color: theme.colors.barText }}
        >
          Sign out
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default SignOut;
