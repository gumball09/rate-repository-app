import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-native';
import useRepository from '../hooks/useRepository';

import { RepositoryItemWithButton } from './RepositoryItem';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import ReviewForm from './ReviewForm';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const repositoryMatch = useRouteMatch('/:id');
  const repository = useRepository(repositoryMatch?.params?.id);

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/reviewform" exact>
          <ReviewForm />
        </Route>
        <Route path="/reviews" exact>
          <UserReviews />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/:id" exact>
          {repository.repository && (
            <RepositoryItemWithButton
              fetchMore={repository.fetchMore}
              item={repository.repository}
            />
          )}
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
