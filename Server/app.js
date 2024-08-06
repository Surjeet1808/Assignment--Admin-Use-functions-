
//require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
//const config = require('./config');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Assignment for Quadiro Technologies');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
