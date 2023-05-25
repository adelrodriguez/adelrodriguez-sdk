# SDK Design Document

## Introduction

The SDK is a small library that provides a convenient interface for accessing [Th One API](https://the-one-api.dev/). It is written in TypeScript and can be used in both Node.js and browser environments.

## Architecture

We have a main `Client` class inside [`src/index.ts`](./src/index.ts), which is the entry point for the SDK. This class is responsible for instantiating the resource classes and exposing them as properties. Each resource class is responsible for instantiating the endpoint classes and exposing them as properties. Each endpoint class is responsible for making the actual API calls.

All the resource classes extend an abstract base class inside [`src/resources/base.ts`](./src/resources/base.ts), which provides a common interface for all the resources. This base class is the one where the actual API calls are made and search parameters are handled.

Since extendability and maintainability were a priority in this project, we have a single file for each class, which makes it easy to add new resources and endpoints.

## Interfaces

The SDK exposes a single client interface, which is instantiated with an API key and an optional `version` parameter. The `version` parameter is used to specify the API version to use. If not specified, the latest version is used.

The client interface exposes methods for each resource, which return a resource interface. The resource interface exposes methods for each endpoint, which return a promise that resolves to the response data.

Here's an example of how you might use the client interface:

```typescript
import Client from 'adelrodriguez-sdk'

const client = new Client({ apiKey; "your-api-key" })
const movies = await client.movies.list({ limit: 1 })
const quote = await client.quotes.get("quoteId")
```

Each resource has a `list` method, which returns a list of all the resources of that type. This method has optional parameters for pagination, sorting and filtering.

Additionally each resource has a `get` method, which returns a single resource of that type. This method takes the resource ID as a parameter.

## Error Handling

There's limited error handling on this project for simplicity. The SDK will throw specific errors if we get a 429 or a 401 from the API. For any other status codes outside 200-299 range, we throw a generic error.

## Testing Strategy

While we're aiming for 100% code coverage, due to the scope of the project we've avoided testing the Rate Limited or generic, since they're hard to reproduce and would require mocking the API.

We've included tests for the both resources endpoints, testing each method in the resource. We've also included tests for the pagination, sorting and filtering parameters.

## Extensibility

To extend the SDK for new resources, you can add new resources classes, extending the abstract base class inside [`src/resources/base.ts`](./src/resources/base.ts). This would make it easy to add support for more endpoints such as `book`, `character` and `chapter`, since they follow very similar patterns.
