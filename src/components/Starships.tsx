// PlanetList.tsx
import * as React from 'react';
import { List, Datagrid, FunctionField, TextField, useUnique, SearchInput, Pagination } from 'react-admin';
import { Starships } from '../types';

const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 15, 25]} />;

const StarshipsList: React.FC = (props) => {
  const unique = useUnique();
  const postFilters = [<SearchInput source="name" alwaysOn resettable={true} validate={unique({ debounce: 3000 })} />];
  return (
    <List {...props} filters={postFilters} sort={{ field: 'name', order: 'ASC' }} pagination={<PostPagination />}>
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
