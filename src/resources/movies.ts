import {
  APIResponse,
  FilterOptions,
  PaginationOptions,
  SortOptions,
  Base,
} from "./base"
import { Quote } from "./quotes"

export type Movie = {
  _id: string
  name: string
  runtimeInMinutes: number
  budgetInMillions: number
  boxOfficeRevenueInMillions: number
  academyAwardNominations: number
  academyAwardWins: number
  rottenTomatoesScore: number
}

export class Movies extends Base {
  /**
   * Fetches a list of movies
   * @returns An API response with a list of movies
   */
  public async list(
    pagination?: PaginationOptions,
    sort?: SortOptions,
    filter?: FilterOptions
  ) {
    return this.request<Movie>("/movie", { pagination, sort, filter })
  }

  /**
   * Fetches a single movie
   * @param id The id of the movie
   * @returns An API response with a single movie
   */
  public async get(id: string): Promise<APIResponse<Movie>> {
    return this.request<Movie>(`/movie/${id}`)
  }

  /**
   * Fetches a list of quotes for a movie
   * @param id The id of the movie to fetch quotes for
   * @returns An API response with a list of quotes from the movie
   */
  public async getQuotes(
    id: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
    filter?: FilterOptions
  ): Promise<APIResponse<Quote>> {
    return this.request<Quote>(`/movie/${id}/quote`, {
      pagination,
      sort,
      filter,
    })
  }
}
