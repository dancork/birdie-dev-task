import React, { useMemo } from 'react'

import Calendar from '../lib/calendar/calendar'

interface EventsCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  data: { date: string, numberOfEvents: number }[];
}

const EventsCalendar: React.FC<EventsCalendarProps> = ({ data, selectedDate, onSelectDate }) => {
  const calendarData = useMemo(() =>
    new Map<string, number>(
      data.map(({ date, numberOfEvents }) => [date.substr(0, 10), numberOfEvents])
    )
  , [data])

  return <Calendar
    selectedDate={selectedDate}
    onSelectDate={onSelectDate}
    data={calendarData}
  />
}

export default EventsCalendar
