import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (includeReviews = false, first = 3) => {
  const [authorized, setAuthorized] = useState(false);
  const { data, loading, fetchMore, refetch } = useQuery(AUTHORIZED_USER, {
    variables: { first, includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: AUTHORIZED_USER,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        first,
        includeReviews,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...previousResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  useEffect(() => {
    if (data) {
      setAuthorized(() => {
        if (data.authorizedUser === null) {
          return false;
        }
        return true;
      });
    }
  }, [data]);

  // return authorized (true if authorized successfully), data fetched, refetch fn to re-execute
  return [authorized, data, handleFetchMore, refetch];
};

export default useAuthorizedUser;
