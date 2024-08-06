const sqlite3 = require('sqlite3').verbose();

// Open the database
const db = new sqlite3.Database('searchncheck.db');

// Define a function to generate random data
const generateRandomData = () => {
  const namesEN = ['John', 'Emma', 'Michael', 'Sophia', 'James'];
  const namesAR = ['يوسف', 'نور', 'مريم', 'علي', 'صفاء'];
  const codes = ['A001', 'B002', 'C003', 'D004', 'E005'];
  const expiryDates = ['2023-12-31', '2024-06-30', '2024-09-30', '2025-03-31', '2025-12-31'];
  const contractStatus = ['Active', 'Inactive'];
  const accID = [1001, 1002, 1003, 1004, 1005];
  const custID = [1001, 1002, 1003, 1004, 1005];
  const services = ['Service A', 'Service B', 'Service C', 'Service D', 'Service E'];
  const notes = ['not working', '', 'need change', 'sdfjmoksdgfkmsdklg fklsdngfksdnkgjn gjsdklgklsdng', 'dsfkj ksdnfk sndkgnksd nksdngks ksdgnk sdnkngksdn nksdngk nsdkgnksdng kfds'];

  // Generate random index for each array
  const randomIndexEN = Math.floor(Math.random() * namesEN.length);
  const randomIndexAR = Math.floor(Math.random() * namesAR.length);
  const randomIndexC = Math.floor(Math.random() * codes.length);
  const randomIndexED = Math.floor(Math.random() * expiryDates.length);
  const randomIndexStatus = Math.floor(Math.random() * contractStatus.length);
  const randomIndexaccID = Math.floor(Math.random() * accID.length);
  const randomIndexcustID = Math.floor(Math.random() * custID.length);
  const randomIndexServices = Math.floor(Math.random() * services.length);
  const randomIndexNotes = Math.floor(Math.random() * services.length);

  // Construct the SQL query
  const sql = `INSERT INTO compData (nameEN, nameAR, nameC, expiryDate, ContractStatus, accID, custID, services, notes) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
  // Execute the SQL query with randomly generated data
  db.run(sql, [namesEN[randomIndexEN], namesAR[randomIndexAR], codes[randomIndexC], 
               expiryDates[randomIndexED], contractStatus[randomIndexStatus], 
               accID[randomIndexaccID], services[randomIndexServices], notes[randomIndexNotes]], custID[randomIndexcustID] ,
    (err) => {
      if (err) {
        console.error('Error inserting data:', err);
      } else {
        console.log('Data inserted successfully');
      }
  });
};

// Insert 10 rows of random data
for (let i = 0; i < 10; i++) {
  generateRandomData();
}

// Close the database connection
db.close();
