import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

import "./styles.css";

const client = new ApolloClient({
  uri: "https://api.graphcms.com/simple/v1/swapi",
  onError(all) {
    console.log(all);
  }
});

const query = gql`
  query GetPersons($search: String = "") {
    persons: allPersons(filter: { name_contains: $search }) {
      id
      name
      height
      hairColor
    }
  }
`;

function App() {
  const [search, setSearch] = React.useState("");
  const { data, loading } = useQuery(query, {
    variables: {
      search
    }
  });

  if (loading) return "loading";

  return (
    <div className="App">
      <input
        key={"some-key"}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      {data.persons.map(c => {
        return <div>{c.name}</div>;
      })}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
