// buildQuery.ts
import { GET_LIST } from 'react-admin';
import gql from 'graphql-tag';
import { BuildQueryFunction, IntrospectionResult, IntrospectionType } from './types';

const buildFieldList = (type: IntrospectionType, raFetchType: string) => {
  switch (raFetchType) {
    case GET_LIST:
      return type.fields
        .filter((field) => field.name !== 'unnecessaryField')
        .map((field) => field.name)
        .join('\n');
    default:
      throw new Error(`Unsupported fetch type ${raFetchType}`);
  }
};

const buildQuery: BuildQueryFunction = (introspectionResults: IntrospectionResult) => (raFetchType: string, resourceName: string) => {
  const resource = introspectionResults.types.find((type) => type.name === resourceName);
  if (!resource) {
    throw new Error(`Resource ${resourceName} not found in introspection result`);
  }

  switch (raFetchType) {
    case GET_LIST:
      return {
        query: gql`
          query ${resource.name} {
            data: ${resource.name} {
              ${buildFieldList(resource, raFetchType)}
            }
          }
        `,
        parseResponse: (response: any) => ({
          data: response.data[resource.name].map((item: any) => ({ id: item.id, ...item })),
        }),
      };
    default:
      throw new Error(`Unsupported fetch type ${raFetchType}`);
  }
};

export default buildQuery;
