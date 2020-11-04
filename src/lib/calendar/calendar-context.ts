import React from 'react'

interface CalendarContextValues {
  data: Map<string, number>;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  min: number;
  max: number;
}

const CalendarContext = React.createContext<CalendarContextValues>({} as CalendarContextValues)

export default CalendarContext
