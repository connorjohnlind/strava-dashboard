require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// MongoDB
require('./db/mongoose');
require('./models/Demo');

// Init
const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(express.static('client/dist'));

// Routes
require('./routes/authRoutes')(app);
require('./routes/demoRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Start
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
