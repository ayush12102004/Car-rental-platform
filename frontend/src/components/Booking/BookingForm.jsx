import React, { useState } from 'react';
import { differenceInDays, format } from 'date-fns';
import { Loader } from 'lucide-react';
import AvailabilityCalendar from './AvailabilityCalendar';
import Button from '../UI/Button';
import { createBooking, createCheckoutSession } from '../../services/bookingService';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const BookingForm = ({ car }) => {
    const { currentUser } = useAuth();
    const toast = useToast();
    const [dates, setDates] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculatePrice = () => {
        if (!dates || !dates.startDate || !dates.endDate) return null;

        const days = differenceInDays(dates.endDate, dates.startDate) + 1; // inclusive
        const rentalCost = days * car.price;
        const serviceFee = Math.round(rentalCost * 0.1); // 10% fee
        const total = rentalCost + serviceFee;

        return { days, rentalCost, serviceFee, total };
    };

    const handleBooking = async () => {
        if (!currentUser) {
            toast.error('Please login to book a car');
            return;
        }

        if (!dates) return;

        setLoading(true);
        try {
            const priceDetails = calculatePrice();

            // 1. Create booking in pending state
            const bookingData = {
                carId: car.id,
                vendorId: car.vendorId, // Assuming car object has vendorId
                renterId: currentUser.uid,
                startDate: dates.startDate.toISOString(),
                endDate: dates.endDate.toISOString(),
                totalAmount: priceDetails.total,
                status: 'pending',
                carDetails: {
                    make: car.make,
                    model: car.model,
                    primaryPhoto: car.primaryPhoto
                }
            };

            const booking = await createBooking(bookingData);

            // 2. Create Stripe checkout session
            const session = await createCheckoutSession(booking.id, priceDetails.total, bookingData.carDetails);

            // 3. Redirect to Stripe
            window.location.href = session.url;

        } catch (error) {
            console.error(error);
            toast.error('Failed to initiate booking');
            setLoading(false);
        }
    };

    const priceDetails = calculatePrice();

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <div className="mb-4">
                <span className="text-2xl font-bold">${car.price}</span>
                <span className="text-gray-500">/day</span>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Dates</label>
                <AvailabilityCalendar carId={car.id} onDatesSelected={setDates} />
            </div>

            {priceDetails && (
                <div className="space-y-3 mb-6 border-t pt-4">
                    <div className="flex justify-between text-gray-600">
                        <span>${car.price} x {priceDetails.days} days</span>
                        <span>${priceDetails.rentalCost}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Service fee</span>
                        <span>${priceDetails.serviceFee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-3">
                        <span>Total</span>
                        <span>${priceDetails.total}</span>
                    </div>
                </div>
            )}

            <Button
                onClick={handleBooking}
                disabled={!dates || loading}
                className="w-full"
                isLoading={loading}
            >
                {loading ? 'Processing...' : 'Reserve Now'}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
                You won't be charged yet
            </p>
        </div>
    );
};

export default BookingForm;
