import React, { useState, useEffect } from 'react';
import buildGraphQLProvider, { IntrospectionResult } from 'ra-data-graphql';
import { Admin, ListGuesser, Resource } from 'react-admin';
import buildQuery from './buildQuery';
import { BuildQueryFunction } from './types';

const App: React.FC = () => {
  const [dataProvider, setDataProvider] = useState<any>(null);

  useEffect(() => {
    const fetchDataProvider = async () => {
      try {
        const introspection: IntrospectionResult = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', { method: 'POST' }).then((response) => response.json());

        const buildQueryFn: BuildQueryFunction = buildQuery(introspection);

        const dataProvider = await buildGraphQLProvider({
          buildQuery: buildQueryFn,
          introspection: introspection,
        });

        setDataProvider(dataProvider);
      } catch (error) {
        console.error('Error setting up data provider:', error);
      }
    };

    fetchDataProvider();
  }, []);

  if (!dataProvider) {
    return <div>Loading</div>;
  }

  console.log(dataProvider);

  return (
    <Admin title="Star Wars API" dataProvider={dataProvider}>
      <Resource name="planet" list={ListGuesser} />
      <Resource name="starship" list={ListGuesser} />
    </Admin>
  );
};

export default App;
