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
  flex-wrap: wrap;
  column-gap: 21px;
  row-gap: 9px;
`

const Cell = styled.button`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 9px; */
  padding: 0;
  outline: none;
  border: none;
  background-color: inherit;
  font-family: 'Inconsolata';
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
`

export const DatePicker = () => {
  let today = startOfToday()

  let newDays = eachDayOfInterval({start: startOfMonth(today), end: endOfMonth(today)})

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
      {newDays.map((day)=><Cell key={day.toString()}>{format(day, 'd')}</Cell>)}
    </Days>
    {/* <button onClick={()=>console.log(newDays)}>show days</button> */}
  </Container>
}
