// server/server.js
const express = require('express');
const apiRouter = require('./api');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.PORT)
app.use(cors())
// Mount API routes
app.use('/', apiRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
