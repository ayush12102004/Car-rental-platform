import React from 'react';
import CarCard from './CarCard';
import Loading from '../UI/Loading';

const CarList = ({ cars, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="h-[400px] bg-gray-100 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (!cars || cars.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900">No cars found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
};

export default CarList;
