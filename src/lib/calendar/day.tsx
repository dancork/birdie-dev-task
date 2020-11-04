import React, { useContext } from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { getDate, getISODay, getWeekOfMonthWithOptions, format, isEqual } from 'date-fns/fp'

import CalendarContext from './calendar-context'

interface DayProps {
  backgroundColor: any;
  isSelected: boolean;
  date: Date;
}

const Day = styled.div.attrs<DayProps>(props => {
  const week = getWeekOfMonthWithOptions({ weekStartsOn: 1 })(props.date)
  const dayOfWeek = getISODay(props.date)
  return {
    style: {
      gridColumn: week,
      gridRow: dayOfWeek
    }
  }
})<DayProps>`
  border-radius: 18px;
  width: 36px;
  height: 36px;
  user-select: none;
  text-align: center;
  line-height: 30px;
  font-size: .875rem;
  font-weight: 600;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.backgroundColor.luminance() > 0.55 ? '#333' : '#fff'};
  cursor: pointer;

  ${(props) =>
    props.isSelected
      ? `
        border: 2px solid ${props.backgroundColor};
        padding: 2px;
        background-clip: content-box;
      `
      : `
        border: 4px solid transparent;
      `
  }
  
  &:hover {
    padding: 4px;
    border: 0;
    background-clip: content-box;
  }
`

const colorScale = chroma.scale('OrRd').padding(0.1).nodata('#f4f4f4')

interface CalendarDayProps {
  date: Date;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date }) => {
  const { data, selectedDate, onSelectDate, min, max } = useContext(CalendarContext)
  const value = data.get(format('yyyy-MM-dd', date))
  const backgroundColor = colorScale.domain([min, max])(value)
  return (
    <Day
      date={date}
      backgroundColor={backgroundColor}
      isSelected={isEqual(selectedDate, date)}
      onClick={() => onSelectDate(date)}
    >
      {getDate(date)}
    </Day>
  )
}

export default CalendarDay
