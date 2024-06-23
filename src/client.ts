
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

const delay = setContext(
  request =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success({ book: "async found book" })
      }, 800)
    })
)
const cache = new InMemoryCache()
const http = new HttpLink({
// uri: 'https://rickandmortyapi.com/graphql'  
uri: 'http://localhost:4000/'
})
const link = ApolloLink.from([
  delay,
  http
])
export const client = new ApolloClient({
    cache,
    link
  });

