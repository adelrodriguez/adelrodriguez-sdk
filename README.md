# adelrodriguez-sdk

This is a small SDK for the [The One API](https://the-one-api.dev/), written in TypeScript.

[See package in npm](https://www.npmjs.com/package/adelrodriguez-sdk)

## Installation

```bash
npm install adelrodriguez-sdk
```

## Usage

```typescript
import SDK from "adelrodriguez-sdk"

const sdk = new SDK({ apiKey: "fN4NgvRGuUxoYMZqSMHC" })

sdk.movies.list({ limit: 1 }).then((movies) => {
  console.log(movies)
})
```

## Testing

Copy the repository to your local environment and install dependencies:

```bash
npm install
```

Then copy the `.env.example` file to `.env` and fill in the `API_KEY` variable with your API key.

Finally, run the tests:

```bash
npm test
```

Be ware that running the test suite multiple times might lead to 429 errors.
