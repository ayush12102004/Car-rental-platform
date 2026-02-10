const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin'); // Using admin SDK

// Basic validation middleware (placeholder)
const validateCarData = (req, res, next) => {
    const { make, model, price, location } = req.body;
    if (!make || !model || !price || !location) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    next();
};

// GET /api/cars - List all available cars
router.get('/', async (req, res) => {
    try {
        let carsRef = db.collection('cars');
        let query = carsRef.where('status', '==', 'available');

        // Apply filters
        const { category, minPrice, maxPrice, vendorId } = req.query;

        if (category) {
            query = query.where('category', '==', category);
        }

        if (vendorId) {
            // If vendorId is provided, we might want to see even unavailable cars? 
            // For now, let's keep it simple. If it's a vendor dashboard, they might want all their cars.
            // But this route filters by 'available'. 
            // Let's make a separate route for vendor cars or relax the 'status' filter if vendorId is present?
            // Or just client-side filter if dataset is small? No, backend filter is better.
            // Let's change the logic: start with collection, apply filters.

            // Reset query to not filter by status immediately if vendorId is present (to show all)
            query = carsRef;
            query = query.where('vendorId', '==', vendorId);
        }

        // Firestore doesn't support multiple inequality filters on different fields easily without composite indexes.
        // Price filtering might need to be done in memory if we don't have indexes.
        // We will do in-memory filtering for price to keep it simple for now, or just basic fetch.

        const snapshot = await query.get();

        if (snapshot.empty) {
            return res.json([]);
        }

        let cars = [];
        snapshot.forEach(doc => {
            cars.push({ id: doc.id, ...doc.data() });
        });

        // In-memory price filtering
        if (minPrice) {
            cars = cars.filter(car => car.price >= Number(minPrice));
        }
        if (maxPrice) {
            cars = cars.filter(car => car.price <= Number(maxPrice));
        }

        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});

// GET /api/cars/:id - Get a single car
router.get('/:id', async (req, res) => {
    try {
        const carRef = db.collection('cars').doc(req.params.id);
        const doc = await carRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
});

// POST /api/cars - Create a new car listing (Vendor only)
// Note: In a real app, you would verify the ID token here to ensure user is a vendor
router.post('/', validateCarData, async (req, res) => {
    try {
        const carData = {
            ...req.body,
            status: 'available',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await db.collection('cars').add(carData);
        res.status(201).json({ id: docRef.id, message: 'Car listing created successfully' });
    } catch (error) {
        console.error('Error creating car listing:', error);
        res.status(500).json({ error: 'Failed to create car listing' });
    }
});

// PUT /api/cars/:id - Update a car listing
router.put('/:id', async (req, res) => {
    try {
        const carRef = db.collection('cars').doc(req.params.id);
        await carRef.update({
            ...req.body,
            updatedAt: new Date().toISOString()
        });
        res.json({ message: 'Car listing updated successfully' });
    } catch (error) {
        console.error('Error updating car listing:', error);
        res.status(500).json({ error: 'Failed to update car listing' });
    }
});

// DELETE /api/cars/:id - Soft delete a car listing
router.delete('/:id', async (req, res) => {
    try {
        const carRef = db.collection('cars').doc(req.params.id);
        await carRef.update({
            status: 'deleted',
            updatedAt: new Date().toISOString()
        });
        res.json({ message: 'Car listing deleted successfully' });
    } catch (error) {
        console.error('Error deleting car listing:', error);
        res.status(500).json({ error: 'Failed to delete car listing' });
    }
});

module.exports = router;
