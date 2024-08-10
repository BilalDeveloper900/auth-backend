const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRouter')
const bankRoutes = require('./routes/banksRouter')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes)
app.use('/bank', bankRoutes)

mongoose.connect("mongodb://localhost:27017/authentication")
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.error('Connection error:', err));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
