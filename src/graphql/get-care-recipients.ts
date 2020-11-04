import { gql } from '@apollo/client'

export const getCareRecipients = gql`
  query GetCareRecipients {
    careRecipients {
      id,
      name
    }
  }
`

export default getCareRecipients
