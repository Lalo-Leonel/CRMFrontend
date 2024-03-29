import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
  // fetch,
});
const authLink = setContext((_, { headers }) => {
  //Leer el Storage alamacenado
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token,
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
