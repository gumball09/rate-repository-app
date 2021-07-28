import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async (variables) => {
    const { data } = await mutate({ variables });
    return data;
  };

  return [signUp, result];
};

export default useSignUp;
