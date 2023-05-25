import Client from "../src"

let client: Client
const fellowshipOfTheRingId = "5cd95395de30eff6ebccde5c"
const quoteId = "5cd96e05de30eff6ebcceced"

describe("Client", () => {
  beforeAll(() => {
    client = new Client({ apiKey: process.env.API_KEY })
  })

  describe("resources", () => {
    describe("movies", () => {
      test("fetches a list of movies", async () => {
        const movies = await client.movies.list()

        expect(movies.docs.length).toBeGreaterThan(0)
      })

      test("fetches a single movie by ID", async () => {
        const movie = await client.movies.get(fellowshipOfTheRingId)

        expect(movie.docs.length).toEqual(1)
      })

      test("fetches a list of quotes for a movie", async () => {
        const quotes = await client.movies.getQuotes(fellowshipOfTheRingId)

        expect(quotes.docs.length).toBeGreaterThan(0)
      })
    })

    describe("quotes", () => {
      test("fetches a list of quotes", async () => {
        const quote = await client.quotes.list()

        expect(quote.docs.length).toBeGreaterThan(0)
      })

      test("fetches a single quote by ID", async () => {
        const quote = await client.quotes.get(quoteId)

        expect(quote.docs.length).toEqual(1)
        expect(quote.docs[0].dialog).toContain("Fly, you fools!")
      })
    })
  })

  describe("pagination", () => {
    test("fetches a list of movies with pagination", async () => {
      const movies = await client.movies.list({ limit: 4 })

      expect(movies.docs.length).toEqual(4)
    })
    test("fetches a list of quotes for a movie with pagination", async () => {
      const quotes = await client.movies.getQuotes(fellowshipOfTheRingId, {
        limit: 10,
      })

      expect(quotes.docs.length).toEqual(10)
    })
  })

  describe("sorting", () => {
    test("fetches a list of movies with sorting", async () => {
      const movies = await client.movies.list(undefined, [
        "budgetInMillions",
        "desc",
      ])

      expect(movies.docs[0].budgetInMillions).toBeGreaterThan(
        movies.docs[movies.docs.length - 1].budgetInMillions
      )
    })

    test("fetches a list of quotes with sorting", async () => {
      const quote = await client.quotes.list(undefined, ["dialog", "desc"])

      expect(quote.docs[0].dialog).toMatch(
        /uhh huh, I feel like I'm back at the Green Dragon/
      )
    })
  })

  describe("filtering", () => {
    test("fetches a quote matching a string", async () => {
      const quote = await client.quotes.list(undefined, undefined, {
        match: { dialog: "You shall not pass!" },
      })

      expect(quote.docs[0].dialog).toContain("You shall not pass!")
    })

    test("fetches a list of movies with a budget greater than or equal to 500", async () => {
      const movies = await client.movies.list(undefined, undefined, {
        range: {
          budgetInMillions: [">=", 500],
        },
      })

      expect(movies.docs).toHaveLength(1)
      expect(movies.docs[0].budgetInMillions).toBeGreaterThanOrEqual(500)
    })
  })
})
