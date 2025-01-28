const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'chatbot.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Fetch all messages from the database
db.all('SELECT * FROM messages', [], (err, rows) => {
  if (err) {
    console.error('Error fetching data', err.message);
  } else {
    console.log('Messages:', rows);
  }
});

// Close the database connection
db.close();