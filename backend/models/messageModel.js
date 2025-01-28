const db = require('../db/database');

const saveMessage = (role, text) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO messages (role, text) VALUES (?, ?)`;
    db.run(query, [role, text], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

const getMessages = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM messages ORDER BY timestamp ASC`;
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = { saveMessage, getMessages };