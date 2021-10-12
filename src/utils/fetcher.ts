// const fetcher = (url: string) => fetch(`${process.env.API_CMS_URL}${url}`).then((r) => r.json());
import { GraphQLClient } from "graphql-request";

const API = `${process.env.API_CMS_URL}/graphql`;

const graphQLClient = new GraphQLClient(API);

const fetcher: any = (query: string, variables?: any, requestHeaders?: any) => {
  if (requestHeaders) {
    graphQLClient.setHeaders(requestHeaders);
  }
  return graphQLClient.request(query, variables);
};

export default fetcher;
