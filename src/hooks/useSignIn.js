import { useApolloClient, useMutation } from '@apollo/react-hooks';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorageContext from './useAuthStorageContext';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorageContext();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
