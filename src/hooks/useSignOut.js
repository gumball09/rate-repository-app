import useAuthStorageContext from './useAuthStorageContext';
import { useApolloClient } from '@apollo/client';

// SignOut custom hook
const useSignOut = () => {
  const apolloClient = useApolloClient(); // access current instance of apollo client
  const authStorage = useAuthStorageContext(); // access the authStorage context

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  // return signOut function
  return [signOut];
};

export default useSignOut;
