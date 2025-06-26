import styled from 'styled-components';
import { DropDown } from './DropDown';
import React, { useState, useMemo } from 'react';

const StyledContainer = styled.div`
  max-height: 100%;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  padding: 16px;
  margin: 12px;
  flex: 1;
`;

const StyledRecords = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  gap: 24px;
  padding: 20px;
  background-color: #eef2f5;
`;

const StyledDiv = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const groupByYearMonth = (records) => {
  const result = new Map();
  records.forEach(record => {
    const date = new Date(record.date_time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (!result.has(year)) result.set(year, new Map());
    const monthsMap = result.get(year);

    if (!monthsMap.has(month)) monthsMap.set(month, []);
    monthsMap.get(month).push(record);
  });
  return result;
};

const YearMonthSelector = ({ years, months, selectedYear, selectedMonth, onYearChange, onMonthChange }) => (
  <div>
    <DropDown
      label="Year"
      options={years}
      value={selectedYear}
      onChange={onYearChange}
    />
    <DropDown
      label="Month"
      options={months}
      value={selectedMonth}
      onChange={onMonthChange}
    />
  </div>
);

export const DisplayRecords = ({ records }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const todayRecords = useMemo(() => (
    records.filter(record => isToday(new Date(record.date_time)))
  ), [records]);
  
  const groupedRecords = useMemo(() => groupByYearMonth(records), [records]);
  console.log(groupedRecords)
  const years = Array.from(groupedRecords.keys());
  console.log(selectedYear)
  console.log(groupedRecords.get(selectedYear))
  const months = selectedYear && groupedRecords.get(Number(selectedYear)) 
    ? Array.from(groupedRecords.get(Number(selectedYear)).keys()) 
    : [];

  const selectedRecords = selectedYear && selectedMonth && groupedRecords.get(Number(selectedYear))?.get(Number(selectedMonth)) || [];

  return (
    <StyledRecords>
      <StyledContainer>
        <YearMonthSelector
          years={years}
          months={months}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={val => setSelectedYear(Number(val))}
          onMonthChange={val => setSelectedMonth(Number(val))}
        />
        <h2>Past Records</h2>
        {selectedRecords.length === 0 ? (
          <p>No records found for selected month.</p>
        ) : (
          selectedRecords.map(record => (
            <StyledDiv key={record.id}>
              <p>Date: {new Date(record.date_time).toLocaleDateString()}</p>
              <p>Amount: {record.ounces} ml</p>
            </StyledDiv>
          ))
        )}
      </StyledContainer>

      <StyledContainer>
        <h2>Today</h2>
        {todayRecords.length === 0 ? (
          <p>No records for today</p>
        ) : (
          todayRecords.map(record => (
            <StyledDiv key={record.id}>
              <p>Date: {new Date(record.date_time).toLocaleDateString()}</p>
              <p>Amount: {record.ounces} ml</p>
            </StyledDiv>
          ))
        )}
      </StyledContainer>
    </StyledRecords>
  );
};

