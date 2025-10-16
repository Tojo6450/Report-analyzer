const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db.js');
const reportRoutes = require('./routes/reportRoutes.js');

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/reports', reportRoutes);

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});