import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (variables) => {
    try {
      await mutate({ variables });
    } catch (e) {
      console.log(e.message);
    }
  };

  return [deleteReview];
};

export default useDeleteReview;
