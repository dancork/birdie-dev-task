import 'dotenv/config'
import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'

import {
  getCareRecipient,
  getCareRecipients,
  getEvents,
  getEventsPerDayForCareRecipient
} from '../../src/db'

const typeDefs = gql`
  scalar Date

  type Event {
    id: ID!
    eventType: String!
    visitId: ID
    caregiverId: ID
    careRecipientId: ID!
    timestamp: Date!
    
    """ This is mentioned in README but doesn't exist in the db """
    mood: String

    """ These are in the database, not sure if they're needed """
    alertId: ID
    taskInstanceId: ID
    rejectedEventId: ID
    observationEventId: ID
  }

  type EventCount {
    date: Date
    numberOfEvents: Int
  }

  type CareRecipient {
    id: ID!
    name: String
    eventsPerDay: [EventCount!]
  }

  type Query {
    careRecipients: [CareRecipient!]!
    careRecipient(recipientId: ID!): CareRecipient!
    events(recipientId: ID, date: Date): [Event!]!
  }
`

const resolvers = {
  Query: {
    careRecipients: () => getCareRecipients(),
    careRecipient: (_: any, args: { recipientId: string }) => getCareRecipient(args.recipientId),
    events: (_: any, args) => getEvents(args)
  },
  CareRecipient: {
    eventsPerDay: (parent: { id: string }) => getEventsPerDayForCareRecipient(parent.id)
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
const handler = apolloServer.createHandler({ path: '/api/graphql' })
const cors = Cors({ allowMethods: ['GET'] })

export default cors(handler)

export const config = {
  api: {
    bodyParser: false
  }
}
