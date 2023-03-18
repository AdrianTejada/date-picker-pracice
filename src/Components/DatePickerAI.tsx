import React, { useState } from "react";
import styled from "styled-components";

interface DatePickerProps {
  onSelectDate: (date: Date) => void;
}

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const DayNumber = styled.div`
  font-size: 1.5rem;
`;

const MonthName = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const ArrowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const DateDisplay = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(
    selectedDate.getMonth()
  );

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth + 1);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const renderDays = () => {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      currentMonth,
      1
    ).getDay();

    const days: JSX.Element[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<DayWrapper key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedDate.getFullYear(), currentMonth, i);
      days.push(
        <DayWrapper key={`day-${i}`} onClick={() => handleSelectDate(date)}>
          <DayNumber>{i}</DayNumber>
        </DayWrapper>
      );
    }

    return days;
  };

  const currentMonthName = new Date(selectedDate.getFullYear(), currentMonth)
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase();

  return (
    <DatePickerWrapper>
      <MonthName>
        <ArrowButton onClick={handlePreviousMonth}>{'<'}</ArrowButton>
        {currentMonthName}
        <ArrowButton onClick={handleNextMonth}>{'>'}</ArrowButton>
      </MonthName>
      <CalendarWrapper>{renderDays()}</CalendarWrapper>
      <DateDisplay>
        Selected date: {selectedDate.toLocaleDateString()}
      </DateDisplay>
    </DatePickerWrapper>
  );
};

export default DatePicker;
