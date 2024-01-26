import { IntrospectionResult } from 'ra-data-graphql';
import { querySchema } from './querySchema';

const buildQuery = (introspectionResults: IntrospectionResult) => {
  console.log('introspectionResults', introspectionResults);

  // Perbaikan: Params seharusnya memiliki tipe objek, bukan string
  return (type: string, resource: string, params: string) => {
    console.log({ params, resource, type });

    switch (type) {
      case 'GET_LIST':
        // Perbaikan: Memanggil querySchema dengan parameter params
        return querySchema(resource);
      default:
        return undefined;
    }
  };
};

export default buildQuery;
