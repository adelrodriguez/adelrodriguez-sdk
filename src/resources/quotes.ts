import {
  APIResponse,
  Base,
  FilterOptions,
  PaginationOptions,
  SortOptions,
} from "~/resources/base"

export type Quote = {
  _id: string
  dialog: string
  movie: string
  character: string
  id: string
}

export class Quotes extends Base {
  /**
   * Fetches a list of quotes
   * @returns An API response with a list of quotes
   */
  public async list(
    pagination?: PaginationOptions,
    sort?: SortOptions,
    filter?: FilterOptions
  ): Promise<APIResponse<Quote>> {
    return this.request<Quote>("/quote", { pagination, sort, filter })
  }

  /**
   * Fetches a single quote
   * @param id The id of the quote
   * @returns An API response with a single quote
   */
  public async get(
    id: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
    filter?: FilterOptions
  ): Promise<APIResponse<Quote>> {
    return this.request<Quote>(`/quote/${id}`, { pagination, sort, filter })
  }
}
