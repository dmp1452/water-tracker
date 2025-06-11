require('dotenv').config(); // Load environment variables
const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Middleware to parse JSON request bodies
app.use(express.json());

// GET endpoint to fetch all water intake records
app.get('/api/water-intake', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM water_tracker');
    res.status(200).json(result.rows); // Send the records as JSON
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST endpoint to add a new water intake record
app.post('/api/water-intake', async (req, res) => {
  const { amount } = req.body;

  // Validate the input
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });
  }

  try {
    // Insert the record into the database
    const result = await pool.query(
      'INSERT INTO water_tracker (amount) VALUES ($1) RETURNING *',
      [amount]
    );
    res.status(201).json(result.rows[0]); // Send the inserted record as a response
  } catch (err) {
    console.error('Error inserting record', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
