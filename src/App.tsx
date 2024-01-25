import React, { useState, useEffect } from 'react';
import buildGraphQLProvider, { BuildQueryFactory } from 'ra-data-graphql';
import { Admin, DataProvider, Resource } from 'react-admin';
import buildQuery from './source/graphql/buildQuery';
import { __schema as schema } from './source/graphql/schema.json';
import Planet from './components/Planet';
import StarshipsList from './components/Starships';

const App: React.FC = () => {
  const [dataProvider, setDataProvider] = useState<DataProvider>();
  useEffect(() => {
    buildGraphQLProvider({
      clientOptions: {
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      },
      // @ts-expect-error schema
      introspection: { schema },
      buildQuery: buildQuery as BuildQueryFactory,
    })
      .then((dataProvider) => setDataProvider(dataProvider))
      .catch((err) => console.log(err));
  }, []);

  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin title="Star Wars API" dataProvider={dataProvider}>
      <Resource name="Planet" list={Planet} />
      <Resource name="Starship" list={StarshipsList} />
    </Admin>
  );
};

export default App;
