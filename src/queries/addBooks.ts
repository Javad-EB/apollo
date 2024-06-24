import { gql } from '@apollo/client';
import { BOOK_FIELDS } from './books';

export const ADD_BOOK = gql`
  mutation AddBook($input: NewBookInput!) {
  addBook(input: $input) {
    ...BookFields
  }
}
${BOOK_FIELDS}
`