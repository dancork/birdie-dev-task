# Birdie Dev Task

The work in this repo is based on the developer task described in the following repository - https://github.com/birdiecare/birdie-test.

## My Solution

### Initial Decisions

I decided not to use the bolierplate setup in the birdiecare repo listed above. I did this for several reasons:

- Many of the dependencies were out-of-date
- A lot of the React components were class based when they could have been simpler functional components
- Higher-order components were being used instead of hooks
- TSLint is deprecated
- Redux is unnessary for an application of this size

### My Setup

In my setup I chose to use the following:

- Next.js, functionaliyy of a simple backend coupled with a React frontend.
- Styled Components, CSS in JS library to style the UI.
- GraphQL/Apollo, more modern approcach to building an API with less overhead to setup/maintain.
- Knex, ORM to simplify database querying.
- ESLint and Standard, to ensure consistent coding style.
- Date-fns, a lightweight library for date manipulation

## Running The Application

You'll need to create a `.env` file in the root of the project and add the following variable.

```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_DATABASE=
```

You can use then use the following commands

```
# To start the app in dev mode
$ npm start

# To validate linting rules
$ npm run lint
# or to also fix
$ npm run lint:fix

# To create a production build
$ npm run build
# This can then be run using
$ ./node_modules/next/dist/bin/next start -p 1234
```

## Viewing The Application

Locally the app will run on `localhost:3000` I have also deployed it on Heroku at [birdie-dev-task.herokuapp.com](https:birdie-dev-task.herokuapp.com).

## Potential Future Additions

Currently there are no tests in the application, because I've been limited on time. I would add these using Jest and maybe also Cypress for a full end-to-end.

As the data was flat, in a single table, I faked some names to make the application feel more real. I have only done this for care recipients but going forward would probably also do this for care givers.

## Issues Faced

- Timestamp field has inconsistent formats, a mix of GMT and UTC. I put in a very hacky fix to convert everything to UTC.
- Mood field was missing the data so was excluded.
- There were additional fields in the database that weren't mentioned in the README, these were ignored.
