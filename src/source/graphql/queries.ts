import gql from "graphql-tag";
import { GetListResult } from "react-admin";
export const queries = () => {
  return {
    query: gql`
      query ExampleQuery {
        allPlanets {
          planets {
            id
            diameter
            created
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
