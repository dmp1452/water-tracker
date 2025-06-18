from fastapi import FastAPI, HTTPException
from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins if needed
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection configuration
db_config = {
    "dbname": os.getenv("PGDATABASE"),
    "user": os.getenv("PGUSER"),
    "password": os.getenv("PGPASSWORD"),
    "host": os.getenv("PGHOST"),
    "port": os.getenv("PGPORT"),
}

# Initialize connection pool
pool = SimpleConnectionPool(1, 10, **db_config)

@app.get("/api/records")
def get_records():
    conn = pool.getconn()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM water_tracker;")
            records = cursor.fetchall()
            return records
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error fetching records")
    finally:
        pool.putconn(conn)

@app.post("/api/records")
def add_record(amount: int):
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount. Must be a positive number.")
    
    conn = pool.getconn()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "INSERT INTO water_tracker (amount) VALUES (%s) RETURNING *",
                (amount,)
            )
            conn.commit()
            record = cursor.fetchone()
            return record
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error inserting record")
    finally:
        pool.putconn(conn)
