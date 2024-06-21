
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

const delay = setContext(
  request =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success({ character: "async found character" })
      }, 800)
    })
)
const cache = new InMemoryCache()
const http = new HttpLink({
uri: 'https://rickandmortyapi.com/graphql'  
})
const link = ApolloLink.from([
  delay,
  http
])
export const client = new ApolloClient({
    cache,
    link
  });

