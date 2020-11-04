import React, { useMemo } from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { getWeeksInMonth, getDaysInMonth, addDays } from 'date-fns/fp'
import { enGB } from 'date-fns/locale'

import { Month, Year } from './types'
import CalendarDay from './day'

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  grid-template-rows: 26px auto;
  column-gap: 28px;
  row-gap: 12px;
`

const MonthName = styled.div`
  grid-column: 1/-1;
  font-size: 1rem;
  line-height: 26px;
  text-align: center;
`

const WeekdayGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 36px);
  row-gap: 6px;
  align-items: center;
  row-gap: 8px;
`

const Weekday = styled.div`
  text-align: right;
  font-size: .75rem;
  font-weight: 400;
  user-select: none;
`

const DayGrid = styled.div<{ weeks: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.weeks}, 36px);
  grid-template-rows: repeat(7, 36px);
  place-items: center;
  justify-items: center;
  justify-content: center;
  column-gap: 16px;
  row-gap: 8px;
`

const getAllDatesInMonth = (firstDayToRender: Date): Date[] =>
  R.range(0, getDaysInMonth(firstDayToRender)).map((value: number) => addDays(value, firstDayToRender))

interface CalendarMonthProps {
  month: Month;
  year: Year;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ month, year }) => {
  const firstDayToRender = useMemo(() => new Date(Date.UTC(year, (month - 1), 1)), [month, year])
  const weeksInMonth = useMemo(() => getWeeksInMonth(firstDayToRender), [firstDayToRender])
  const days: Date[] = useMemo(() => getAllDatesInMonth(firstDayToRender), [firstDayToRender])

  return (
    <MonthGrid>
      <MonthName>{enGB.localize.month(month)}, {year}</MonthName>
      <WeekdayGrid>
      {[1, 2, 3, 4, 5, 6, 0].map(dayNo =>
        <Weekday key={dayNo}>{enGB.localize.day(dayNo, { width: 'abbreviated' })}</Weekday>
      )}
      </WeekdayGrid>
      <DayGrid weeks={weeksInMonth}>
      {days.map((date, i) =>
        <CalendarDay key={`${year}-${month}-${i + 1}`} date={date} />
      )}
      </DayGrid>
    </MonthGrid>
  )
}

export default CalendarMonth
