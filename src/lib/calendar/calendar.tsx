import React, { useMemo } from 'react'
import styled from 'styled-components'

import { MonthAndYearTuple } from './types'
import CalendarMonth from './month'
import CalendarContext from './calendar-context'

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  column-gap: 80px;
  margin: 32px 0;
`

interface CalendarProps {
  start?: MonthAndYearTuple;
  monthsToRender?: number;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  data: Map<string, number>;
}

// I've made this so that it could be dynamic, but as the data is just for 2 months I didn't do much to optimise it
// i.e. the styling might not work with more months
const Calendar: React.FC<CalendarProps> = ({ start = [4, 2019], monthsToRender = 2, data, selectedDate, onSelectDate }) => {
  const monthAndYearTuples: MonthAndYearTuple[] = useMemo(() =>
    Array(monthsToRender).fill(null).map((_, value) => [
      ((start[0] + value) % 12),
      Math.floor((start[0] + value) / 12) + start[1]
    ])
  , [start])

  // extract min and max values
  const [min, max]: [number, number] = useMemo(() =>
    [
      Math.min(...data.values()),
      Math.max(...data.values())
    ]
  , [data])

  return (
    <CalendarContext.Provider value={{ data, selectedDate, onSelectDate, min, max }}>
      <CalendarGrid>
        {monthAndYearTuples.map(([month, year]) =>
          <CalendarMonth key={`${year}-${month}`} month={month} year={year} />
        )}
      </CalendarGrid>
    </CalendarContext.Provider>
  )
}

export default Calendar
