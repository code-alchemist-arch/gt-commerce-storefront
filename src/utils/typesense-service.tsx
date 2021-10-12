import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

class TypesenseService {
  private static instance: TypesenseService;
  private client: any;

  private static HOSTS = process.env.TYPESENSE_HOSTS;
  private static API_KEY = process.env.TYPESENSE_API_KEY;

  private constructor() {
    const typesenseInstantSearchAdapter = new TypesenseInstantSearchAdapter({
      server: {
        apiKey: TypesenseService.API_KEY,
        nodes: TypesenseService.HOSTS.split(",").map((host) => ({
          host,
          port: "443",
          protocol: "https",
        })),
      },
      additionalSearchParameters: {
        queryBy: "product_name",
        // sortBy: "product_name_order:asc",
        sortBy: "_text_match:desc",
        // hitsPerPage: 12, // does not work
        // sortFacetValuesBy: 'alpha', // does not work
      },
    });
    this.client = typesenseInstantSearchAdapter.searchClient;
  }

  public static getInstance(): TypesenseService {
    if (!TypesenseService.instance) {
      TypesenseService.instance = new TypesenseService();
    }

    return TypesenseService.instance;
  }

  public getClient(): any {
    return this.client;
  }
}

export default TypesenseService;
