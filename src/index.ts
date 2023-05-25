import { Movies } from "./resources/movies"
import { Quotes } from "./resources/quotes"
import { ClientConfig } from "./resources/base"

export default class Client {
  public movies: Movies
  public quotes: Quotes

  constructor(config: ClientConfig) {
    this.movies = new Movies(config)
    this.quotes = new Quotes(config)
  }
}
