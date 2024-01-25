// types.ts
export interface IntrospectionResult {
  types: IntrospectionType[];
}

export interface IntrospectionType {
  name: string;
  fields: IntrospectionField[];
}

export interface IntrospectionField {
  name: string;
  type: IntrospectionFieldType;
}

export interface IntrospectionFieldType {
  name: string;
  kind: string;
}

export interface BuildQueryFunction {
  (introspectionResults: IntrospectionResult): (
    raFetchType: string,
    resourceName: string
  ) => {
    query: any;
    variables?: any;
    parseResponse: (response: any) => void;
  };
}
