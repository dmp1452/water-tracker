import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const API_BASE_URL = 'http://localhost:8000/api/records'; // Backend URL

function App() {
  const [records, setRecords] = useState([]); // State to store fetched records
  const [amount, setAmount] = useState(''); // State to store input value

  // Fetch records from the backend
  const fetchRecords = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // Add a new record
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
  };

  // Fetch records when the component mounts
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Water Tracker</h1>
        <form onSubmit={addRecord}>
          <label htmlFor="amount">Water Intake (ml):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">Add Record</button>
        </form>
        <h2>Records</h2>
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              Date: {record.date}, Amount: {record.amount} ml
            </li>
          ))}
        </ul>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
