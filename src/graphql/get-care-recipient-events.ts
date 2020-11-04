import { gql } from '@apollo/client'

export const getCareRecipientEvents = gql`
  query GetRecipientEvents($recipientId: ID, $date: Date) {
    events (recipientId: $recipientId, date: $date) {
      id,
      eventType,
      visitId,
      caregiverId,
      careRecipientId,
      timestamp,
      mood
    }
  }
`

export default getCareRecipientEvents
