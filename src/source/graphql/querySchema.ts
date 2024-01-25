import { queries, StarshipQueries } from './queries';

export const querySchema = (source: string) => {
  switch (source) {
    case 'Planet':
      return queries();
    case 'Starship':
      return StarshipQueries();
    default:
      return undefined;
  }
};
