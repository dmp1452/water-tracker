import styled from 'styled-components';
import { DropDown } from './DropDown';
import React, { useState } from 'react';

const StyledContainer = styled.div`
  max-height: 100%
  background-color: #f9f9f9; 
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  padding: 16px;
  margin: 12px;
`

const StyledRecords = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 20px;
  background-color: #eef2f5;
`

const StyledDiv = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`


const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const grouped = (records) => {
 const grouped = new Map();

  records.forEach(record => {
    const date = new Date(record.date_time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 

    if (!grouped.has(year)) {
    grouped.set(year, new Map());
    }

    const yearMap = grouped.get(year);

    if (!yearMap.has(month)) {
      yearMap.set(month, []);
    }

    yearMap.get(month).push(record);
  });
  return grouped
}

const  YearMonthSelector= ({ years, months, selectedYear, selectedMonth, onYearChange, onMonthChange }) =>{
  return (
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
}

const onYearChange = (year)=>{
  set_selected_year(year)
}

const onMonthChange =(month) => {
  set_selected_month(month)
}

export const DisplayRecords = ({ records }) => {
  const [selected_month, set_selected_month] = useState([])
  const [selected_year, set_selected_year] = useState([])
  const today_records = records.filter(record => 
  isToday(new Date(record.date_time))
  )

  const old_records = records.filter(record => 
  !isToday(new Date(record.date_time))
  )

  const grouped_records = grouped(records)
  selected_records=grouped_records[selected_year][selected_month]
  return (
    <StyledRecords>

    <StyledContainer>
      <YearMonthSelector
        years={grouped_records.keys}
        months={grouped_records[selected_year].keys}
        selectedMonth={selected_month}
        selectedYear={selected_year}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />
      <h2>Past Records</h2>
      {records.length === 0 ? (
        <p>No past records found.</p>
      ) : (
        old_records.map((record) => (
          <StyledDiv key={record.id}>
            <p>Date: {new Date(record.date_time).toLocaleDateString()}</p>
            <p>Amount: {record.ounces} ml</p>
          </StyledDiv>
        ))
      )}
    </StyledContainer>

    <StyledContainer>
      <h2>Today</h2>
      {today_records.length ===0 ? (
        <p>No records for today</p>
      ):(
        today_records.map((record) => (
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
