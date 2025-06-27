import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const OuncesCalendar = ({ records, selectedYear, selectedMonth }) => {
  // Build a lookup for ounces by date string (YYYY-MM-DD)
  const ouncesByDate = {};
  records.forEach(record => {
    const dateStr = new Date(record.date_time).toISOString().slice(0, 10);
    ouncesByDate[dateStr] = (ouncesByDate[dateStr] || 0) + record.ounces;
  });

  // Set the calendar to the first day of the selected month/year
  const activeStartDate = new Date(selectedYear, selectedMonth - 1, 1);

  return (
    <Calendar
      activeStartDate={activeStartDate}
      // Prevent navigation to other months (optional)
      minDetail="month"
      maxDetail="month"
      // Show ounces for each day
      tileContent={({ date, view }) => {
        if (view === 'month') {
          const dateStr = date.toISOString().slice(0, 10);
          const ounces = ouncesByDate[dateStr];
          return ounces ? <div style={{ color: 'blue', fontSize: '0.8em' }}>{ounces} ml</div> : null;
        }
      }}
    />
  );
};