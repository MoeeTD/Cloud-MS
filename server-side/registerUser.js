require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const registerUser = (username, password) => {
  const db = new sqlite3.Database('searchncheck.db');
  const hashedPassword = bcrypt.hashSync(password, 10);
  const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(insertQuery, [username, hashedPassword], (err) => {
    if (err) {
      console.error('Error registering user:', err);
    } else {
      console.log('User registered successfully');
    }
    db.close();
  });
};

const main = async () => {
  const username = await askQuestion('Enter username: ');
  const password = await askQuestion('Enter password: ');

  registerUser(username, password);

  rl.close();
};

main();
