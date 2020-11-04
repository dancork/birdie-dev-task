import { gql } from '@apollo/client'

export const getCareRecipient = gql`
  query GetCareRecipient ($recipientId: ID!) {
    careRecipient (recipientId: $recipientId) {
      id,
      name,
      eventsPerDay {
        date,
        numberOfEvents
      }
    }
  }
`

export default getCareRecipient
