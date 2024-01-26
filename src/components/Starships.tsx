// PlanetList.tsx
import * as React from 'react';
import { List, Datagrid, FunctionField, TextField, useUnique, SearchInput } from 'react-admin';
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

const StarshipsList: React.FC = (props) => {
  const unique = useUnique();
  const postFilters = [<SearchInput source="name" alwaysOn resettable={true} validate={unique({ debounce: 3000 })} />];
  return (
    <List {...props} filters={postFilters}>
      <Datagrid rowClick="edit">
        <TextField source="name" label="Starships Name" sortByOrder="DESC" />
        <FunctionField
          label="Film Titles"
          render={(record: Starships) => (
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

export default StarshipsList;
