import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context'; // sending auth token to headers

import { relayStylePagination } from '@apollo/client/utilities';

// CONSTRUCT HTTP LINK
const httpLink = createHttpLink({
  // Use own IP address (retrieved from app.config.js via Constants.manifest)
  uri: Constants.manifest.extra.apolloUri,
});

// CONSTRUCT CACHE WITH FIELD POLICIES
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // format of pagination's result object & args are based on the Relay's pagination specs
        repositories: relayStylePagination(),
      },
    },
    repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

// CONSTRUCT APOLLO CLIENT
const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (error) {
      console.log('Error getting access token from storage: ', error.message);
      return {
        headers,
      };
    }
  });

  // Return new Apollo client
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
