require('dotenv').config();  // This loads the variables from .env into process.env
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

const fetchRecords = async () => {
    try {
      const result = await pool.query('SELECT * FROM water_tracker ');
      console.log(result.rows);
    } catch (err) {
      console.error('Error executing query', err.stack);
    } finally {
      await pool.end();
    }
  }

fetchRecords()
  