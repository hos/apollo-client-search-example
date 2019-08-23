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
    }
  }
`;

function App() {
  const [search, setSearch] = React.useState("");
  const { data, loading, refetch } = useQuery(query);

  if (loading) return "loading";

  function handleChange({ target }) {
    setSearch(target.value);
    refetch({ search });
  }
  const styles = {
    div: {
      display: "flex",
      "flex-wrap": "wrap"
    },
    span: {
      margin: "2px",
      "font-size": "11px"
    }
  };
  return (
    <div className="App">
      <div>
        <input key={"some-key"} value={search} onChange={handleChange} />
      </div>
      <div style={styles.div}>
        {data.persons.map(c => {
          return <span style={styles.span}>{c.name}, </span>;
        })}
      </div>
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
