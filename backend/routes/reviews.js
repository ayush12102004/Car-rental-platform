const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');

// GET /api/reviews/:carId - Get reviews for a car
router.get('/:carId', async (req, res) => {
    try {
        const snapshots = await db.collection('reviews')
            .where('carId', '==', req.params.carId)
            .orderBy('createdAt', 'desc')
            .get();

        const reviews = [];
        snapshots.forEach(doc => {
            reviews.push({ id: doc.id, ...doc.data() });
        });

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// POST /api/reviews - Create a review
router.post('/', async (req, res) => {
    try {
        const { carId, userId, rating, comment, userName } = req.body;

        // Check if user has booked this car and returned it (optional validation)

        const reviewData = {
            carId,
            userId,
            userName,
            rating,
            comment,
            createdAt: new Date().toISOString()
        };

        await db.collection('reviews').add(reviewData);

        // Update car average rating
        const carRef = db.collection('cars').doc(carId);

        await db.runTransaction(async (t) => {
            const carDoc = await t.get(carRef);
            const carData = carDoc.data();

            const newTotalReviews = (carData.totalReviews || 0) + 1;
            const currentRating = carData.rating || 0;
            const newRating = ((currentRating * (carData.totalReviews || 0)) + rating) / newTotalReviews;

            t.update(carRef, {
                rating: Number(newRating.toFixed(1)),
                totalReviews: newTotalReviews
            });
        });

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

module.exports = router;
