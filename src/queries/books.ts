
import { gql } from '@apollo/client';

export const BOOK_FIELDS = gql`
fragment BookFields  on Book {
  id
  title
  author {
    firstName
    lastName
  }
}
`;

export const GET_BOOKS = gql`
query GetBooks {
  books {
    ...BookFields
  }
}
${BOOK_FIELDS}
`;

