import React from 'react'

interface CalendarContextValues {
  data: Map<string, number>;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  colorScale: any;
}

const CalendarContext = React.createContext<CalendarContextValues>({} as CalendarContextValues)

export default CalendarContext
