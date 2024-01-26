import gql from 'graphql-tag';
import { GetListResult } from 'react-admin';
export const queries = () => {
  
  return {
    query: gql`
      query Planets {
        allPlanets {
          planets {
            id
            name
            filmConnection {
              films {
                id
                title
              }
            }
          }
          totalCount
        }
      }
    `,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseResponse: async (response: Record<string, any>) => {
      const datas = await response.data.allPlanets;
      const result: GetListResult = {
        data: datas.planets,
        total: datas.totalCount,
      };
      return result;
    },
  };
};
// Corrected StarshipQueries
export const StarshipQueries = () => {
  return {
    query: gql`
      query Starship {
        allStarships {
          starships {
            id
            name
            filmConnection {
              films {
                id
                title
              }
            }
          }
          totalCount
        }
      }
    `,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseResponse: async (response: Record<string, any>) => {
      const datas = await response.data.allStarships;
      const result: GetListResult = {
        data: datas.starships, 
        total: datas.totalCount,
      };
      return result;
    },
  };
};
