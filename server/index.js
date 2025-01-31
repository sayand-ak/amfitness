const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const traineeRoutes = require('./routes/trainee');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/trainee', traineeRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
