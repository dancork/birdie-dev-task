import React, { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns/fp'
import styled from 'styled-components'
import * as Ionicons from '@styled-icons/ionicons-outline'

import getCareRecipientEvents from '../graphql/get-care-recipient-events'
import { BodyText, SectionHeading } from './typography'
import EventsListItem, { Event } from './events-list-item'

const EventListGrid = styled.div`
  display: grid;
  grid-template-columns: 24px auto auto;
  grid-template-rows: auto;
  column-gap: 16px;
  row-gap: 10px;
  justify-content: start;
  align-items: center;
  padding-left: 22px;

  & svg {
    display: block;
  }
`

const VisitDetails = styled.div`
  display: grid;
  grid-template-columns: 32px auto auto;
  column-gap: 12px;
  justify-content: start;
  align-items: center;
  grid-column: 1 / -1;
  margin: 22px 0 8px -22px;
`

const VisitDate = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`

const VisitTime = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #666;
`

interface Visit {
  visitId?: string;
  startDate: Date;
  endDate: Date;
  events: Event[]
}

interface EventsListProps {
  selectedDate: Date;
  recipientId: string;
}

const EventsList: React.FC<EventsListProps> = ({ selectedDate, recipientId }) => {
  const { loading, error, data } = useQuery(getCareRecipientEvents, { variables: { recipientId, date: selectedDate } })

  const groupEventsByVisit: Visit[] = useMemo(() => {
    return data?.events.reduce((acc: Visit[], event: Event) => {
      const previousIndex = acc.length - 1
      if (!acc.length || !event.visitId || acc[previousIndex].visitId !== event.visitId) {
        acc.push({ visitId: event.visitId, startDate: event.timestamp, endDate: event.timestamp, events: [event] })
      } else {
        acc[previousIndex].startDate = event.timestamp
        acc[previousIndex].events.push(event)
      }
      return acc
    }, [])
  }, [data])

  if (loading) return <BodyText>Loading events...</BodyText>
  if (error || !data) return <BodyText>Unable to load events for care recipient.</BodyText>

  return <>
    <SectionHeading>Event Log</SectionHeading>
    <EventListGrid>
    {groupEventsByVisit.map((visit, index) => {
      const startDate = new Date(visit.startDate)
      const endDate = new Date(visit.endDate)
      return (
        <React.Fragment key={`visit-${index}`}>
          <VisitDetails>
            {visit.visitId ? <Ionicons.Calendar size={32} /> : <Ionicons.Server size={32} />}
            <VisitDate>{format('E d MMM', startDate)}</VisitDate>
            <VisitTime>{format('HH:mm', startDate)} - {format('HH:mm', endDate)}</VisitTime>
          </VisitDetails>
          {visit.events.map((event) =>
            <EventsListItem key={event.id} event={event} />
          )}
        </React.Fragment>
      )
    })}
    </EventListGrid>
  </>
}

export default EventsList
