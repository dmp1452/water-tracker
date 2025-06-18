from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = FastAPI()
load_dotenv()
db_config = {
    "dbname": os.getenv("PGDATABASE"),
    "user": os.getenv("PGUSER"),
    "password": os.getenv("PGPASSWORD"),
    "host": os.getenv("PGHOST"),
    "port": os.getenv("PGPORT"),
}
connection = psycopg2.connect(**db_config)

class WaterIntake(BaseModel):
    amount: int


@app.get("/api/water-intake")
def get_water_intake():
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM water_tracker ORDER BY date DESC")
            records = cursor.fetchall()
            return records
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error fetching records")


@app.post("/api/water-intake")
def add_water_intake(data: WaterIntake):
    if data.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount. Must be a positive number.")
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "INSERT INTO water_tracker (amount) VALUES (%s) RETURNING *",
                (data.amount,),
            )
            connection.commit()
            record = cursor.fetchone()
            return record
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error inserting record")
