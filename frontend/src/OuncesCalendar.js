import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const OuncesCalendar = ({ records, selectedYear, selectedMonth }) =>{ 
  const activeStartDate = new Date(selectedYear, selectedMonth - 1, 1);
  const ouncesByDate = {};
  records.forEach(record => {
    const dateStr = new Date(record.date_time).toISOString().slice(0, 10);
    ouncesByDate[dateStr] = (ouncesByDate[dateStr] || 0) + record.ounces;
  });

  return (
    <Calendar
      minDetail="month"
      maxDetail="month"
      activeStartDate={activeStartDate}
      tileContent={({ date, view }) => {
        if (view === 'month') {
          const dateStr = date.toISOString().slice(0, 10);
          const ounces = ouncesByDate[dateStr];
          return ounces ? <div style={{ color: 'blue', fontSize: '0.8em' }}>{ounces} ml</div> : null;
        }
      }}
    />
  )}