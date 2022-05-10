const connectToMongo = require("./db");
const express = require("express");

// connecting to mongo db
connectToMongo();

const app = express();
const port = 3000;

// required this middleware to Parse json bodies for this app.
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// listening on port {3000} for a request 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
