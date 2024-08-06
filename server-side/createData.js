const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();

// Open the database
const db = new sqlite3.Database('searchncheck.db');

// Create an interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for each column value
rl.question('Enter AccountID: ', (accountId) => {
  rl.question('Enter name(EN): ', (nameEN) => {
    rl.question('Enter name(AR): ', (nameAR) => {
      rl.question('Enter name(C): ', (nameC) => {
        rl.question('Enter Services: ', (services) => {
          rl.question('Enter Expiry Date: ', (expiryDate) => {
            rl.question('Enter Contract Status: ', (contractStatus) => {
              rl.question('Enter Notes: ', (notes) => { 
                // Perform database operation with collected input
                const sql = `INSERT INTO compData (AccID, nameEN, nameAR, nameC, services, expiryDate, contractStatus, notes) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                db.run(sql, [accountId, nameEN, nameAR, nameC, services, expiryDate, contractStatus, notes], (err) => {
                  if (err) {
                    console.error('Error inserting data:', err);
                  } else {
                    console.log('Data inserted successfully');
                  }
                  // Close the readline interface and database connection
                  rl.close();
                  db.close();
                });
              });
            });
          });
        });
      });
    });
  });
});
