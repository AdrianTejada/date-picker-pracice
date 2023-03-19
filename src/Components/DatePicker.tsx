import React, {useState} from 'react';
import styled from 'styled-components';

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { 
  startOfToday,
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  isToday,
  isSameMonth,
  isEqual,
  getMonth,
  add,
  sub,
  parse
} from 'date-fns';

const Container = styled.div`
  width: 346px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 5px;
  padding: 10px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
`

const Month = styled.h3`
  font-family: 'RM';
  font-weight: 400;
  font-size: 16px;
  color: #333;
`


const Week = styled.div`
  width: 100%;
  height: 31px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:12px;
`

const Days = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 21px;
  row-gap: 10px;
`

type CellProps = {
  isToday: boolean,
  currentMonth: boolean,
  selectedDay: boolean
}

const Cell = styled.button<CellProps>`
  min-width: 31px;
  min-height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  outline: none;
  border: none;
  background-color: ${({selectedDay})=>selectedDay ? '#333' : 'inherit'};
  font-family: 'Inconsolata';
  font-size: 15px;
  color: ${({isToday, currentMonth, selectedDay}) => {
    if (isToday) {
      return '#41AF89'
    } 
    if (selectedDay) {
      return '#f6f6f6'
    }
    if (!currentMonth) {
      return '#E6E6E6'
    }
    if (currentMonth) {
      return '#333'
    }
  }};
  border-radius: 50%;
`;

const Weekday = styled.div`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'RM';
  font-size: 13px;
  cursor: default;
  font-weight: 400;
  /* border: 1px solid black; */
  color: #333;
`

export const DatePicker = () => {
  let today = startOfToday()

  const [selectedDay, setSelectedDay] = useState<Date>(today)
  const [selectedMonth, setSelectedMonth] = useState<string>(format(today, 'MMMM yyyy'))
  const [days, setDays] = useState<Date[]>(eachDayOfInterval({start: startOfWeek(startOfMonth(today)), end: endOfWeek(endOfMonth(today))}))

  const changeMonth = (amount: number) => {
    let firstDayCurrentMonth = parse(selectedMonth, 'MMMM yyyy', new Date())
    let firstDayNextMonth = add(firstDayCurrentMonth, {months: amount})
    setSelectedMonth(format(firstDayNextMonth, 'MMMM yyyy'))
    setDays(eachDayOfInterval({start: startOfWeek(startOfMonth(firstDayNextMonth)), end: endOfWeek(endOfMonth(firstDayNextMonth))}))
  }
  

  return <Container>
    <Top>
      <BsChevronLeft 
        size={20} 
        color='#333333'
        onClick={()=>changeMonth(-1)}
      />
        <Month>
          {selectedMonth}
        </Month>
      <BsChevronRight 
        size={20} 
        color='#333333'
        onClick={()=>changeMonth(1)}
      />
    </Top>
    <Week>
      <Weekday>Su</Weekday>
      <Weekday>Mo</Weekday>
      <Weekday>Tu</Weekday>
      <Weekday>We</Weekday>
      <Weekday>Th</Weekday>
      <Weekday>Fr</Weekday>
      <Weekday>Sa</Weekday>
    </Week>

    <Days>
      {days.map((day)=><Cell 
          isToday={isToday(day)}
          currentMonth={isSameMonth(day, parse(selectedMonth, 'MMMM yyyy', new Date()))}
          selectedDay={isEqual(selectedDay, day)}
          key={day.toString()}
          onClick={()=>setSelectedDay(day)}
        >
          {format(day, 'd')}
        </Cell>
      )}
    </Days>
  </Container>
}
