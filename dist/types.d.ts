type Quote = {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
    id: string;
};
declare class Quotes extends Base {
    /**
     * Fetches a list of quotes
     * @returns An API response with a list of quotes
     */
    list(pagination?: PaginationOptions, sort?: SortOptions, filter?: FilterOptions): Promise<APIResponse<Quote>>;
    /**
     * Fetches a single quote
     * @param id The id of the quote
     * @returns An API response with a single quote
     */
    get(id: string, pagination?: PaginationOptions, sort?: SortOptions, filter?: FilterOptions): Promise<APIResponse<Quote>>;
}
type ClientConfig = {
    apiKey: string;
    version?: string;
};
type APIResponse<T> = {
    docs: T[];
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
};
type RequestOptions = {
    pagination?: PaginationOptions;
    sort?: SortOptions;
    filter?: FilterOptions;
};
type PaginationOptions = {
    limit?: number;
    page?: number;
    offset?: number;
};
type ResourceKey = Exclude<keyof (Quote & Movie), "id" | "_id">;
type SortOptions = [ResourceKey, "asc" | "desc"];
/**
 * The filtering works by casting simple url parameter expressions to MongoDB
 * lookup expressions and can be applied to any available key on the data
 * models.
 */
type FilterOptions = {
    /**
     * Accepts either a string or an array of strings. The string can be a regex.
     */
    match?: {
        [key in `${ResourceKey}` | `${ResourceKey}!`]?: string | string[];
    };
    range?: {
        [key in ResourceKey]?: [">" | "<" | "<=" | ">=", number];
    };
};
declare abstract class Base {
    constructor(config: ClientConfig);
    protected request<T = unknown>(path: string, options?: RequestOptions, config?: RequestInit): Promise<APIResponse<T>>;
}
type Movie = {
    _id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
};
declare class Movies extends Base {
    /**
     * Fetches a list of movies
     * @returns An API response with a list of movies
     */
    list(pagination?: PaginationOptions, sort?: SortOptions, filter?: FilterOptions): Promise<APIResponse<Movie>>;
    /**
     * Fetches a single movie
     * @param id The id of the movie
     * @returns An API response with a single movie
     */
    get(id: string): Promise<APIResponse<Movie>>;
    /**
     * Fetches a list of quotes for a movie
     * @param id The id of the movie to fetch quotes for
     * @returns An API response with a list of quotes from the movie
     */
    getQuotes(id: string, pagination?: PaginationOptions, sort?: SortOptions, filter?: FilterOptions): Promise<APIResponse<Quote>>;
}
export default class Client {
    movies: Movies;
    quotes: Quotes;
    constructor(config: ClientConfig);
}

//# sourceMappingURL=types.d.ts.map
