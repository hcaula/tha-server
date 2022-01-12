# tha-server

> **Code Coverage**: 100% Statements 131/131 | 83.33% Branches 20/24 | 100% Functions 29/29 | 100% Lines 118/118

The Node.js server application for Origin's [take-home assignment](https://github.com/hcaula/tha).

## Overview

This application can calculate an user's financial health wellness based on their annual income and monthly costs. This score is assessed by three values: "low", "medium" and "healthy".

## Developing

### Requirements

- [Node](https://nodejs.org/en/download/) version 16.13 or higher (we recommend using [NVM](https://github.com/nvm-sh/nvm) for installing and managing Node versions);
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/).

### Quick start

1. Install the project's dependencies:

```sh
yarn install
```

2. Run the project:

```sh
yarn start
```

The server should be running locally and accessible at http://localhost:3002.

### Testing

We use Cypress to test this application. You use an interactive GUI by running:

```sh
yarn cy:open
```

> Make sure that the server is running before running the tests!

Also, you can run directly on CLI by running:

```
yarn test
```

> The server will run automatically when running this command, so it doesn't have to be running in the background.

#### Coverage

This project is configured to provide code coverage metrics after testing. They can be found in the directory `coverage` after running the tests.

There's a visual HTML explorer that can be found at `coverage/lcov-report/index.html`.

## Documentation

### GET `/financial/health`

#### Parameters

##### `monthly-cost`: number | required

_How much the user spend in a month_.

##### `annual-income`: number | required

_How much the user earns in a year_.

#### Output

##### `HEALTHY` | `MEDIUM` | `LOW`: string | not null

_The financial health status_.

## Technical decisions

### Why is this application in Node.js with TypeScript?

There are a lot of great options of frameworks and languages to choose from. Examining this app requirements, performance shouldn't be a main issue, since the response times don't have to present extremely low latencies. It is really important, however, that the server runs even simple computations on its side, providing data that is already ready to be presented for the frontend, so that it doesn't have to worry about calculation performance. Therefore, I would prioritise frameworks and languages with easy and quick development times.

Options like scripted languages such as JavaScript/TypeScript, Python or Ruby come to mind. For simplicity's sake, to reuse the same language as the frontend, **Node.js** seems like a good choice (implemented with TypeScript).

### How to test this application?

Since we chose a REST approach, it could be nice to call the routes, passing different parameters, and testing the output. Doing this allows us to test all the integrated classes that are used in theses routes, which will provide us with a great coverage very easily.

There are some tools that can be used for that, such as Mocha and Jest. But, as an experiment, I would like to try [Cypress for E2E API tests](https://www.cypress.io/blog/2017/11/07/add-gui-to-your-e2e-api-tests/). It provides an easy UI and familiarity, but may have too much overhead.

#### My experience using Cypress as an API test tool

Using Cypress, with only a single file a few tests, we reached 100% of statements code coverage.

However, notice that only 83.33% of branches were covered. The part that could not be reached was the internal server error middleware. There was not an easy way to mock this return and, after all, how can we force that the code will break by making an API call? So, for those cases, I would recommend using unit or integration tests.

Nevertheless, it's worth noticing that running the tests themselves are quite fast, averaging ~100ms by test. So, the overhead is not as slow as anticipated.

## Technical debts left

### Refactor validation messages

The validation messages found on `src/financial/health/schema.ts` are hardcoded. Ideally, those could be reused by other schemas.

### Implement different middlewares for 400 and 500 errors

Currently, there's only one middleware for handling errors: `src/middlewares/error.middleware.ts`. However, it would be much simpler if there were two different middlewares. A problem that could occur is: what if we wanted to report 500 errors to an error monitoring tool? It would be necessary to differentiate between those errors, which is breaking the Single Responsibility principle.

### Parse query string properly

In `src/financial/health/controller.ts`, the parameters are receiving in string, so they have to be converted to number. Currently, the controller is doing that, but there should be a DAO/DTO class to handle that.
