// PlanetList.tsx
import * as React from 'react';
import { List, Datagrid, FunctionField, TextField, useUnique, SearchInput } from 'react-admin';

interface Planet {
  id: string;
  name: string;
  filmConnection: {
    films: {
      id: string;
      title: string;
    }[];
  };
}

const PlanetList: React.FC = (props) => {
  const unique = useUnique();
  const postFilters = [<SearchInput source="name" alwaysOn resettable validate={unique({ debounce: 3000 })} />];

  return (
    <List {...props} filters={postFilters} sort={{ field: 'name', order: 'ASC' }}>
      <Datagrid rowClick="edit">
        <TextField source="name" label="Planet Name" />
        <FunctionField
          label="Film Titles"
          render={(record: Planet) => (
            <ul>
              {record.filmConnection.films.map((film) => (
                <li key={film.id}>{film.title}</li>
              ))}
            </ul>
          )}
        />
      </Datagrid>
    </List>
  );
};

export default PlanetList;
