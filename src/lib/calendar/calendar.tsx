import React, { useMemo } from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'

import { MonthAndYearTuple } from './types'
import CalendarMonth from './month'
import CalendarContext from './calendar-context'

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  column-gap: 80px;
  margin: 0 0 32px 0;
`

const Min = styled.div`
  font-size: .75rem;
`

const Max = styled(Min)`
  grid-column: 5;
  text-align: right;
`

const ColorScale = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 25px);
  grid-template-rows: repeat(2, 25px);
  margin: 32px 0 0;
  justify-content: end;
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

  // extract min and max values and create a color scale
  const [colorScale, min, max]: [any, number, number] = useMemo(() => {
    const min = Math.min(...data.values())
    const max = Math.max(...data.values())
    return [
      chroma
        .scale('OrRd')
        .domain([min, max])
        .padding(0.1)
        .nodata('#f4f4f4'),
      min,
      max
    ]
  }, [data])

  return (
    <CalendarContext.Provider value={{ data, selectedDate, onSelectDate, colorScale }}>
      <ColorScale>
        {colorScale.colors(5).map((backgroundColor: string) =>
          <div key={backgroundColor} style={{ backgroundColor }} />
        )}
        <Min>{min}</Min>
        <Max>{max}</Max>
      </ColorScale>
      <CalendarGrid>
        {monthAndYearTuples.map(([month, year]) =>
          <CalendarMonth key={`${year}-${month}`} month={month} year={year} />
        )}
      </CalendarGrid>
    </CalendarContext.Provider>
  )
}

export default Calendar
