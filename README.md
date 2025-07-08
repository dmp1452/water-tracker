# Water Tracker

A full-stack web application for tracking daily water intake. Built with **FastAPI** (Python) for the backend, **PostgreSQL** for data storage, and **React** for the frontend.

---

## Features

- Add your daily water intake (in ounces or milliliters)
- View all records, grouped by date
- Responsive and modern UI with React and styled-components

---

## Tech Stack

- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL
- **Frontend:** React (JavaScript, styled-components)

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm
- PostgreSQL

---

### Backend Setup

1. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn psycopg2 python-dotenv
   ```

2. **Configure environment variables:**
   - Create a `.env` file in the `backend` folder:
     ```
     PGDATABASE=your_db_name
     PGUSER=your_db_user
     PGPASSWORD=your_db_password
     PGHOST=localhost
     PGPORT=5432
     ```

3. **Create the database table:**
   ```sql
   CREATE TABLE water_tracker (
     id SERIAL PRIMARY KEY,
     date DATE NOT NULL DEFAULT CURRENT_DATE,
     amount INTEGER NOT NULL
   );
   ```

4. **Run the backend:**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

---

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the frontend:**
   ```bash
   npm start
   ```

3. The app will be available at [http://localhost:3000](http://localhost:3000).

---

### Running Both Servers

You can use the provided `start.bat` script (Windows) to launch both backend and frontend servers in separate terminals:
```bat
start.bat
```

---

## Usage

- Enter your water intake and submit.
- View your daily intake records, grouped by date.

---

## Folder Structure

```
water-tracker/
├── backend/
│   ├── main.py
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── ...
│   └── package.json
└── start.bat
```

---

## License

MIT License

---

## Author

