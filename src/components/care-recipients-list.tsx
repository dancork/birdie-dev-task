import React from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Link from 'next/link'

import getCareRecipients from '../graphql/get-care-recipients'
import { BodyText, Heading, SectionHeading } from './typography'

const List = styled.ul`
  padding: 0;
  list-style: none;
`

const ListItem = styled.li`
  color: ${props => props.theme.darkBlue};
  font-size: 1rem;
  padding: 0.125rem 0;
  line-height: 150%;
`

const StyledLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.darkBlue};
  &:hover {
    color: ${props => props.theme.blue};
  }
`

const CareRecipientsList: React.FC = () => {
  const { loading, error, data } = useQuery(getCareRecipients)

  return (
    <>
      <Heading>Welcome back!</Heading>
      <SectionHeading>Care Recipients</SectionHeading>
      <List>
      {loading && <BodyText>Loading...</BodyText>}
      {error && <BodyText>Unable to fetch list of care recipients.</BodyText>}
      {data?.careRecipients?.map(({ name, id }) =>
        <ListItem key={id}>
          <Link href={`/${id}`} passHref>
            <StyledLink>{name}</StyledLink>
          </Link>
        </ListItem>
      )}
      </List>
    </>
  )
}

export default CareRecipientsList
