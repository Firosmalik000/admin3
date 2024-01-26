// PlanetList.tsx
import * as React from 'react';
import { List, Datagrid, FunctionField, TextField, useUnique, SearchInput, Pagination } from 'react-admin';
import { Planet } from '../types';

const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 15, 25]} />;

const PlanetList: React.FC = (props) => {
  const unique = useUnique();
  const postFilters = [<SearchInput source="name" alwaysOn resettable={false} validate={unique({ debounce: 3000 })} />];

  return (
    <List {...props} filters={postFilters} sort={{ field: 'name', order: 'ASC' }} pagination={<PostPagination />}>
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
