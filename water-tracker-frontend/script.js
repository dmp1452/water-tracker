const API_BASE_URL = 'http://localhost:8000/api/water-intake';

// Fetch and display all records
const fetchRecords = async () => {
  const response = await fetch(API_BASE_URL);
  const records = await response.json();
  const recordsList = document.getElementById('records');
  recordsList.innerHTML = '';
  records.forEach(record => {
    const listItem = document.createElement('li');
    listItem.textContent = `Date: ${record.date}, Amount: ${record.amount} ml`;
    recordsList.appendChild(listItem);
  });
};

// Add a new record
const addRecord = async (amount) => {
  await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  fetchRecords(); // Refresh the records list
};

// Handle form submission
document.getElementById('water-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = parseInt(document.getElementById('amount').value, 10);
  if (amount > 0) {
    addRecord(amount);
  } else {
    alert('Please enter a valid amount.');
  }
});

// Initial fetch of records
fetchRecords();