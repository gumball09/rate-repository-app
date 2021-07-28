import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (variables) => {
    try {
      const { data } = await mutate({ variables });
      return data.createReview.repositoryId;
    } catch (e) {
      console.log(e.message);
    }
  };

  return [createReview, result];
};

export default useReview;
