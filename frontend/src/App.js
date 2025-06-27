import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { DisplayRecords } from './ShowRecords';
import { AddRecords } from './AddRecords';
const API_BASE_URL = 'http://localhost:8000/api/records';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

function App() {
  console.log('React version at runtime:', React.version);

  const [records, setRecords] = useState([]); 
  
  const fetchRecords = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const addRecords = async (amount) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseInt(amount, 10) }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchRecords();
    } catch (error) {
      console.error('Error adding record:', error);
    }
  }

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

 
  useEffect(() => {
    fetchRecords();
    console.log(records)
  }, []);

  useEffect(() => {
    console.log(records)
  }, [records]);


  return (
    <StyledDiv>
     <DisplayRecords records={records} groupedRecords={groupByYearMonth(records)}/>
     <AddRecords onAdd={addRecords}/>
    </StyledDiv>
  );
}

export default App;
