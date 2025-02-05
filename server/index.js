const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const traineeRoutes = require('./routes/trainee');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/trainee', traineeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
