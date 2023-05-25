import "isomorphic-fetch"

import { Movie } from "./movies"
import { Quote } from "./quotes"

export type ClientConfig = {
  apiKey: string
  version?: string
}

export type APIResponse<T> = {
  docs: T[]
  total: number
  limit: number
  offset: number
  page: number
  pages: number
}

export type RequestOptions = {
  pagination?: PaginationOptions
  sort?: SortOptions
  filter?: FilterOptions
}

export type PaginationOptions = {
  limit?: number
  page?: number
  offset?: number
}

type ResourceKey = Exclude<keyof (Quote & Movie), "id" | "_id">

export type SortOptions = [ResourceKey, "asc" | "desc"]

/**
 * The filtering works by casting simple url parameter expressions to MongoDB
 * lookup expressions and can be applied to any available key on the data
 * models.
 */
export type FilterOptions = {
  /**
   * Accepts either a string or an array of strings. The string can be a regex.
   */
  match?: { [key in `${ResourceKey}` | `${ResourceKey}!`]?: string | string[] }
  range?: { [key in ResourceKey]?: [">" | "<" | "<=" | ">=", number] }
}

export abstract class Base {
  private apiKey: string
  private version?: string

  private readonly BASE_URL = "https://the-one-api.dev/"

  constructor(config: ClientConfig) {
    if (!config.apiKey) throw new Error("No API key provided")

    this.apiKey = config.apiKey
    this.version = config.version || "v2"
  }

  protected async request<T = unknown>(
    path: string,
    options?: RequestOptions,
    config?: RequestInit
  ): Promise<APIResponse<T>> {
    const url = new URL(`${this.BASE_URL}${this.version}${path}`)
    const searchParams = this.generateSearchParams(options)
    url.search = searchParams

    const headers = new Headers({
      Authorization: `Bearer ${this.apiKey}`,
      Accept: "application/json",
    })

    const response = await fetch(url, {
      ...config,
      headers,
    })

    if (response.status === 401) throw new Error("Unauthorized")

    if (response.status === 429) {
      throw new Error("Rate limit exceeded")
    }

    if (!response.ok) {
      throw new Error("Something went wrong. Status code: " + response.status)
    }

    return response.json()
  }

  private generateSearchParams(options?: RequestOptions): string {
    const params = new URLSearchParams()

    if (options?.pagination) {
      const { limit, page, offset } = options.pagination

      if (limit) params.append("limit", limit.toString())
      if (page) params.append("page", page.toString())
      if (offset) params.append("offset", offset.toString())
    }

    if (options?.sort) {
      const [key, order] = options.sort

      params.append("sort", `${key}:${order}`)
    }

    if (options?.filter?.match) {
      const { match } = options.filter
      for (const key in match) {
        params.append(
          key,
          Array.isArray(match[key]) ? match[key].join(",") : match[key]
        )
      }
    }

    let paramsString = params.toString()

    if (options?.filter?.range) {
      const { range } = options.filter
      for (const key in range) {
        paramsString += `&${key}${range[key][0]}${range[key][1]}`
      }
    }

    return paramsString
  }
}
