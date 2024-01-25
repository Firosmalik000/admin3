// PlanetList.tsx
import * as React from 'react';
import { List, Datagrid, FunctionField, TextField, SearchInput, SelectInput } from 'react-admin';

interface Starships {
  id: string;
  name: string;
  filmConnection: {
    films: {
      id: string;
      title: string;
    }[];
  };
}

const postFilters = [<SearchInput source="q" alwaysOn resettable={false} />, <TextField source="name" label="Name" sort={{ field: 'name', order: 'ASC' }} />, <SelectInput source="name" />];

const StarshipsList: React.FC = (props) => (
  <List {...props} filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Starships Name" />
      <FunctionField label="Film Titles" render={(record: Starships) => record.filmConnection.films.map((film) => film.title).join(', ')} />
    </Datagrid>
  </List>
);

export default StarshipsList;
