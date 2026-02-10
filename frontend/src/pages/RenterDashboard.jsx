import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Button from '../components/UI/Button';
import { getUserBookings } from '../services/bookingService';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const RenterDashboard = () => {
    const { currentUser } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            fetchBookings();
        }
    }, [currentUser]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await getUserBookings(currentUser.uid, 'renter');
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
                <p className="text-gray-600 mb-8">Manage your upcoming and past rentals</p>

                {/* Bookings List */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-12">Loading...</div>
                    ) : bookings.length === 0 ? (
                        <div className="bg-white p-12 rounded-xl text-center shadow-sm">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No bookings yet</h3>
                            <p className="text-gray-500 mb-6">You haven't booked any cars yet.</p>
                            <Link to="/search">
                                <Button>Find a Car</Button>
                            </Link>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                                {/* Car Image (if available or placeholder) */}
                                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                        src={booking.carDetails?.primaryPhoto || 'https://via.placeholder.com/200'}
                                        alt={booking.carDetails?.make}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold">
                                            {booking.carDetails?.make} {booking.carDetails?.model}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${booking.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {booking.bookingStatus}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {format(new Date(booking.pickupDate || booking.startDate), 'MMM dd, yyyy')} - <br />
                                                {format(new Date(booking.returnDate || booking.endDate), 'MMM dd, yyyy')}
                                            </span>
                                        </div>
                                        {/* Add more details if available */}
                                    </div>

                                    <div className="flex justify-between items-center border-t pt-4 mt-2">
                                        <span className="font-bold text-lg">${booking.totalAmount}</span>
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RenterDashboard;
