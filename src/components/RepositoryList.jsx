import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import useDebounce from '../hooks/useDebounce';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

import Dropdown from './Dropdown';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  searchBarContainer: {
    padding: 16,
  },
  searchBar: {
    backgroundColor: theme.colors.containerBackground,
    borderColor: theme.colors.containerBackground,
    shadowColor: theme.colors.barBackground,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
  },
});

const dropdownItems = [
  { label: 'Latest repositories', value: 'latest_repositories' },
  { label: 'Highest rated repositories', value: 'highest_rated_repositories' },
  { label: 'Lowest rated repositories', value: 'lowest_rated_repositories' },
];

export const RepositoryListContainer = ({
  onChange,
  onEndReached,
  onValueChange,
  repositories,
}) => {
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const [value, setValue] = useState('');

  const onPress = (id) => () => {
    history.push(`/${id}`);
  };

  const onChangeText = (val) => {
    setValue(val);
    onChange(val);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <>
          <View style={styles.searchBarContainer}>
            <TextInput
              onChangeText={onChangeText}
              placeholder="Search"
              style={styles.searchBar}
              value={value}
            />
            <Dropdown items={dropdownItems} onValueChange={onValueChange} />
          </View>
        </>
      }
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      renderItem={(item) => (
        <TouchableOpacity onPress={onPress(item.item.id)}>
          <RepositoryItem {...item} />
        </TouchableOpacity>
      )}
      testID="repositoryList"
    />
  );
};

const getParameters = (value) => {
  switch (value) {
    case 'latest_repositories':
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    case 'highest_rated_repositories':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case 'lowest_rated_repositories':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    default:
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }
};

const RepositoryList = () => {
  const [parameters, setParameters] = useState(getParameters());
  const [searchKeyword, setSearchKeyword] = useDebounce(100);

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy: parameters.orderBy,
    orderDirection: parameters.orderDirection,
    searchKeyword: searchKeyword || undefined,
  });

  const onEndReached = () => fetchMore();
  const onValueChange = (value) => setParameters(getParameters(value));
  const onChange = (value) => setSearchKeyword(value);

  return (
    <RepositoryListContainer
      onChange={onChange}
      onEndReached={onEndReached}
      onValueChange={onValueChange}
      repositories={repositories}
    />
  );
};

export default RepositoryList;
