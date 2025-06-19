import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { DisplayRecords } from './ShowRecords';
const API_BASE_URL = 'http://localhost:8000/api/records'; // Backend URL

function App() {
  console.log('React version at runtime:', React.version);

  const [records, setRecords] = useState([]); 
  const [amount, setAmount] = useState(''); 
  
  const fetchRecords = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  /** 
  const addRecord = async (e) => {
    e.preventDefault();
    if (amount > 0) {
      try {
        await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: parseInt(amount, 10) }),
        });
        setAmount('');
        fetchRecords(); // Refresh the records list
      } catch (error) {
        console.error('Error adding record:', error);
      }
    } else {
      alert('Please enter a valid amount.');
    }
  };*/

 
  useEffect(() => {
    fetchRecords();
    console.log(records)
  }, []);

  useEffect(() => {
    console.log(records)
  }, [records]);


  return (
    <div>
     <DisplayRecords records={records} />
    </div>
  );
}

export default App;
