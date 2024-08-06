const sqlite3 = require('sqlite3').verbose();

// Create SQLite database
const db = new sqlite3.Database('searchncheck.db');

// Create tables
db.serialize(() => {
  // Create compData table
  db.run(`CREATE TABLE IF NOT EXISTS compData (
    accID INTEGER,
    custID TEXT,
    nameEN TEXT,
    nameAR TEXT,
    nameC TEXT,
    services TEXT,
    contractStatus TEXT,
    expiryDate TEXT,
    notes TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating compData table:', err.message);
    } else {
      console.log('compData table created successfully!');
    }
  });

  // Create users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('users table created successfully!');
    }
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed successfully!');
  }
});