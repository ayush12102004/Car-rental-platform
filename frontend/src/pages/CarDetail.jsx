import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Settings, Fuel, Users, Check, ChevronLeft } from 'lucide-react';
import Button from '../components/UI/Button';
import BookingForm from '../components/Booking/BookingForm';
import ReviewList from '../components/Reviews/ReviewList';
import ReviewForm from '../components/Reviews/ReviewForm';
import { getCarById } from '../services/carService';
import Loading from '../components/UI/Loading';

const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        fetchCarDetails();
    }, [id]);

    const fetchCarDetails = async () => {
        setLoading(true);
        try {
            const data = await getCarById(id);
            setCar(data);
        } catch (error) {
            console.error('Failed to fetch car details', error);
            // navigate('/404');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading fullScreen />;
    if (!car) return <div className="text-center py-20">Car not found</div>;

    const images = car.photos && car.photos.length > 0 ? car.photos : [car.primaryPhoto || 'https://via.placeholder.com/800x600'];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="container-custom py-8">
                <Button
                    variant="ghost"
                    icon={ChevronLeft}
                    onClick={() => navigate(-1)}
                    className="mb-4"
                >
                    Back
                </Button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="w-full lg:w-2/3 space-y-8">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            <div className="h-[400px] md:h-[500px]">
                                <img
                                    src={images[activeImage]}
                                    alt={car.make}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex gap-2 p-4 overflow-x-auto">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${activeImage === idx ? 'border-primary' : 'border-transparent'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Car Info */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{car.make} {car.model} {car.year}</h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-medium text-gray-900">{car.rating || 'New'}</span>
                                            <span>({car.totalReviews || 0} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{car.location?.city || car.location?.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100">
                                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <Settings className="w-6 h-6 text-primary mb-2" />
                                    <span className="text-sm font-medium">{car.transmission}</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <Fuel className="w-6 h-6 text-primary mb-2" />
                                    <span className="text-sm font-medium">{car.fuelType}</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <Users className="w-6 h-6 text-primary mb-2" />
                                    <span className="text-sm font-medium">{car.seatingCapacity} Seats</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <Star className="w-6 h-6 text-primary mb-2" />
                                    <span className="text-sm font-medium">{car.category}</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-4">Features</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {car.features && car.features.length > 0 ? (
                                        car.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <Check className="w-5 h-5 text-green-500" />
                                                <span className="text-gray-600">{feature}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No features listed</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-4">Description</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {car.description || `Experience the comfort and performance of this ${car.year} ${car.make} ${car.model}. Perfect for your next trip.`}
                                </p>
                            </div>

                            {/* Reviews Section */}
                            <div className="mt-12 border-t pt-8">
                                <h2 className="text-xl font-bold mb-6">Reviews</h2>
                                <div className="mb-8">
                                    <ReviewForm carId={car.id} onReviewAdded={fetchCarDetails} />
                                </div>
                                <ReviewList carId={car.id} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Booking */}
                    <div className="w-full lg:w-1/3">
                        <BookingForm car={car} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
