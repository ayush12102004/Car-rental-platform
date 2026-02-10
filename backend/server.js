require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.send('Car Rental Platform API is running');
});

// Routes
const carsRouter = require('./routes/cars');
const bookingsRouter = require('./routes/bookings');
const paymentsRouter = require('./routes/payments');
const reviewsRouter = require('./routes/reviews');

app.use('/api/cars', carsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/reviews', reviewsRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
