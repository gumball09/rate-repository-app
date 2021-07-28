import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories(
    $after: String
    $first: Int
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      after: $after
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        totalCount
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query authorizedUser(
    $after: String
    $first: Int
    $includeReviews: Boolean = false
  ) {
    authorizedUser {
      id
      username
      reviews(after: $after, first: $first) @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            id
            rating
            repository {
              fullName
              name
            }
            text
            repositoryId
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          totalCount
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      description
      forksCount
      fullName
      id
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;
