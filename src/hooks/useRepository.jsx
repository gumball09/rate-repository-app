import { useLazyQuery } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const [id, setId] = useState(null);
  const [getRepository, { data, loading, fetchMore }] = useLazyQuery(
    GET_REPOSITORY,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: 1,
        id: id,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  useEffect(() => {
    if (repositoryId) {
      setId(repositoryId);
    }
  }, [repositoryId]);

  useEffect(() => {
    if (id) {
      getRepository({ variables: { id: id, first: 1 } });
    }
  }, [id]);

  return { repository: data?.repository, fetchMore: handleFetchMore, loading };
};

export default useRepository;
