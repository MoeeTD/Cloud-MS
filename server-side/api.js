// server/api.js

require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('searchncheck.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET)


db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// Register endpoint
/*router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(insertQuery, [username, hashedPassword], (err) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'User registered successfully' });
  });
});*/

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const selectQuery = `SELECT * FROM users WHERE username = ?`;

  db.get(selectQuery, [username], (err, user) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '8h'
    });
    console.log(token)
    res.json({ token });
  });
});

// Middleware to authenticate routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};


// API endpoint for searching users by name
router.get('/search', (req, res) => {

  const { query, category } = req.query;
  console.log(req.query)
  if (!category) {
    return res.status(400).json({ error: 'Category parameters are required' });
  }

  const sql = `SELECT * FROM compData WHERE ${category} = ? COLLATE NOCASE`;

  db.all(sql, [`${query}`], (err, rows) => {
    if (err) {
      console.error('Error searching users:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
});

router.get('/edit', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM compData`;

  db.all(sql, (err, rows) => {
    if (err) {
      console.error("Error pulling data:", err)
      console.log('hi')
    }
    res.json(rows);
  }) 

})


router.put('/edit/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const { accID, custID, nameEN, nameAR, nameC, services, expiryDate, contractStatus, notes, type } = req.body;

  // Check if the ID exists in the database
  const checkIfExistsQuery = `
    SELECT COUNT(*) AS count FROM compData WHERE accID = ?
  `;

  db.get(checkIfExistsQuery, [accID], (err, row) => {
    if (err) {
      console.error("Error checking if ID exists:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // If ID exists, update the row; otherwise, insert a new row
    if (row.count > 0 && type !== "delete") {
      const updateQuery = `
        UPDATE compData
        SET nameEN = ?, nameAR = ?, nameC = ?, services = ?, expiryDate = ?, contractStatus = ?, notes = ?, custID = ? 
        WHERE accID = ?
      `;

      db.run(updateQuery, [nameEN, nameAR, nameC, services, expiryDate, contractStatus, notes, custID, accID], (updateErr) => {
        if (updateErr) {
          console.error("Error updating data:", updateErr);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json({ message: "Data updated successfully" });
      });

    } else if (accID === "") {
      // Find the maximum existing ID and increment it by one
      const getMaxIdQuery = `
        SELECT MAX(CAST(accID as INTEGER)) as maxId FROM compData
      `;

      db.get(getMaxIdQuery, (err, row) => {
        if (err) {
          console.error("Error getting max ID:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        let newId = row.maxId !== null ? row.maxId + 1 : 1;
        console.log("Generated new ID:", newId);

        const insertQuery = `
          INSERT INTO compData (accID, custID, nameEN, nameAR, nameC, services, expiryDate, contractStatus, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(insertQuery, [newId, custID, nameEN, nameAR, nameC, services, expiryDate, contractStatus, notes], (insertErr) => {
          if (insertErr) {
            console.error("Error inserting data:", insertErr);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.json({ message: "New row added successfully" });
          console.log(`Added new row with ID ${newId}`);
        });
      });

    } else if (type === "delete") {
      const sql = `DELETE FROM compData WHERE accID = ?`;
      db.run(sql, [id], (err) => {
        if (err) {
          console.error("Error deleting row:", err.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json({ message: `Row(s) deleted: ${id}` });
      });
    } else {
      const insertQuery = `
        INSERT INTO compData (accID, custID, nameEN, nameAR, nameC, services, expiryDate, contractStatus, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.run(insertQuery, [accID, custID, nameEN, nameAR, nameC, services, expiryDate, contractStatus, notes], (insertErr) => {
        if (insertErr) {
          console.error("Error inserting data:", insertErr);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json({ message: "New row added successfully" });
        console.log(`Added ${id}`);
      });
    }
  });
});


router.delete('/edit/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  console.log(id)
  
      const sql = `DELETE FROM compData WHERE accID = ?`;
      db.run(sql, [id], (err) => {
        if (err) {
            console.error("Error deleting row:", err.message);
            return;
        }
        res.json({message: `Row(s) deleted: ${id}`});
    });
    }
);




module.exports = router;
