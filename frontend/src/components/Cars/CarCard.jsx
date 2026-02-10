import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Fuel, Settings, Users } from 'lucide-react';
import Button from '../UI/Button';

const CarCard = ({ car }) => {
    const {
        id,
        make,
        model,
        year,
        price,
        rating,
        totalReviews,
        primaryPhoto,
        location,
        transmission,
        fuelType,
        seatingCapacity
    } = car;

    return (
        <div className="card overflow-hidden group h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={primaryPhoto || 'https://via.placeholder.com/400x300?text=No+Image'} // Fallback image
                    alt={`${make} ${model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-bold shadow-sm">
                    ${price}/day
                </div>
            </div>

            <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg">
                            {make} {model}
                        </h3>
                        <p className="text-sm text-gray-500">{year}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{rating || 'New'}</span>
                        {totalReviews > 0 && <span className="text-gray-400">({totalReviews})</span>}
                    </div>
                </div>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{location?.address || 'Location N/A'}</span>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-4">
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                        <Settings className="w-4 h-4 mb-1 text-primary" />
                        <span>{transmission}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                        <Fuel className="w-4 h-4 mb-1 text-primary" />
                        <span>{fuelType}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                        <Users className="w-4 h-4 mb-1 text-primary" />
                        <span>{seatingCapacity} Seats</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <Link to={`/cars/${id}`} className="block">
                        <Button className="w-full">View Details</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
