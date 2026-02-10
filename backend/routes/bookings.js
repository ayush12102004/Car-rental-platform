const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

// GET /api/bookings - Get user's bookings
router.get('/', async (req, res) => {
    try {
        const { userId, role } = req.query; // specific user or all (if admin)

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        let query = db.collection('bookings');

        if (role === 'vendor') {
            query = query.where('vendorId', '==', userId);
        } else {
            query = query.where('renterId', '==', userId);
        }

        const snapshot = await query.orderBy('createdAt', 'desc').get();

        const bookings = [];
        snapshot.forEach(doc => {
            bookings.push({ id: doc.id, ...doc.data() });
        });

        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
    try {
        const bookingData = {
            ...req.body,
            bookingStatus: 'pending', // pending payment
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Verify availability (should be done here)
        // For now, assume availability is checked on frontend or we trust the request

        const docRef = await db.collection('bookings').add(bookingData);

        res.status(201).json({ id: docRef.id, message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

module.exports = router;
