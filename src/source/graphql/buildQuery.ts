import { IntrospectionResult } from "ra-data-graphql";
import { querySchema } from "./querySchema";

const buildQuery = (introspectionResults: IntrospectionResult) => {
  console.log("introspectionResults", introspectionResults);
  return (type: string, resource: string, params: string) => {
    console.log({ params, resource, type });
    switch (type) {
      case "GET_LIST":
        return querySchema(resource);
      default:
        return undefined;
    }
  };
};

export default buildQuery;
