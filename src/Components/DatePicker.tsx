import React from 'react';
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
  isSameMonth
} from 'date-fns';

const Container = styled.div`
  width: 346px;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 5px;
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
  background-color: inherit;
  font-family: 'Inconsolata';
  font-size: 15px;
  color: ${(props) => {
    if (props.isToday) {
      return '#41AF89'
    } 
    else if (props.currentMonth) {
      return '#333'
    } 
    else {
      return '#898989'
    }
  }};
  /* background-color: white; */
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

  let newDays = eachDayOfInterval({start: startOfWeek(startOfMonth(today)), end: endOfWeek(endOfMonth(today))})

  return <Container>
    <Top>
      <BsChevronLeft size={20} color='#333333'/>
        <Month>
          {format(today, 'MMMM yyyy')}
        </Month>
      <BsChevronRight size={20} color='#333333'/>
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
      {newDays.map((day)=><Cell isToday={isToday(day)} currentMonth={isSameMonth(day, today)} key={day.toString()}>{format(day, 'd')}</Cell>)}
    </Days>
  </Container>
}
