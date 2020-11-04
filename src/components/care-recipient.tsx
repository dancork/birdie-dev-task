import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import getCareRecipient from '../graphql/get-care-recipient'
import { BodyText, Heading } from './typography'
import EventCalendar from './events-calendar'
import { getYear } from 'date-fns/fp'
import EventsList from './events-list'

// Last date we have data
const FakeToday = new Date(Date.UTC(2019, 4, 12))

const CareRecipient: React.FC = () => {
  const { query: { recipientId } } = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>(FakeToday)
  const { loading, error, data } = useQuery(getCareRecipient, { variables: { recipientId, year: getYear(selectedDate) } })

  if (loading) return <BodyText>Loading...</BodyText>
  if (error || !data) return <BodyText>Unable to load data for care recipient.</BodyText>

  return (
    <>
      <Heading>{data.careRecipient.name}</Heading>
      <EventCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        data={data.careRecipient.eventsPerDay}
      />
      <EventsList
        recipientId={recipientId as string}
        selectedDate={selectedDate}
      />
    </>
  )
}

export default CareRecipient
