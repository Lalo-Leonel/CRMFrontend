import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
  // fetch,
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      miPropioHeader: "Hola!...",
    },
  };
});
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
// const client = new ApolloClient({
//   connectToDevTools: true,
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: "http://localhost:4000/",
//   }),
// });

export default client;
