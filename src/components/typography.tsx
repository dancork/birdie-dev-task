import styled from 'styled-components'

export const SectionHeading = styled.div`
  color: ${props => props.theme.darkTeal};
  font-size: .875rem;
  letter-spacing: .3rem;
  text-transform: uppercase;
  line-height: 120%;
  margin: 0;
  font-weight: 600;
  margin-bottom: 1em;
  padding-top: .5rem;
`

export const Heading = styled.div`
  color: ${props => props.theme.darkBlue};
  margin: 0 0 .5em;
  padding-top: 1rem;
  font-size: 2.07rem;
  line-height: 125%;
  font-weight: 600;
`

export const BodyText = styled.div`
  color: ${props => props.theme.darkBlue};
  font-size: 1rem;
  margin-bottom: .5em;
  padding-top: 1rem;
  line-height: 150%;
`
