require('dotenv').config();
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


app.use(express.json());


app.get('/api/water-intake', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM water_tracker');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/water-intake', async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });
  }

  try {

    const result = await pool.query(
      'INSERT INTO water_tracker (amount) VALUES ($1) RETURNING *',
      [amount]
    );
    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error('Error inserting record', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
