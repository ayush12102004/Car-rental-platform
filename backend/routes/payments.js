const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock'); // Mock if no key

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { bookingId, amount, carDetails } = req.body;

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${carDetails.make} ${carDetails.model}`,
                            images: carDetails.primaryPhoto ? [carDetails.primaryPhoto] : [],
                        },
                        unit_amount: Math.round(amount * 100), // cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/bookings/${bookingId}?success=true`,
            cancel_url: `${req.headers.origin}/bookings/${bookingId}?canceled=true`,
            metadata: {
                bookingId: bookingId
            }
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: 'Failed to create payment session' });
    }
});

module.exports = router;
