import React from 'react';
import { NativeRouter } from 'react-router-native'; // USE OF ROUTER

import { ApolloProvider } from '@apollo/client'; // Provide Apollo client instance to all components
import createApolloClient from './src/utils/apolloClient'; // Create Apollo client
import AuthStorage from './src/utils/AuthStorage'; // Create storage for storing token for authentication
import AuthStorageContext from './src/contexts/AuthStorageContext'; // Provide authStorage context to hooks from App.js

import Main from './src/components/Main';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => (
  <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <Main />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  </NativeRouter>
);

export default App;
