import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../UI/Button';

const FilterPanel = ({ onFilter, isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        onFilter(data);
        if (window.innerWidth < 768) {
            onClose(); // Close on mobile after apply
        }
    };

    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${isOpen ? 'block' : 'hidden md:block'
            }`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                    onClick={() => reset()}
                    className="text-sm text-gray-500 hover:text-primary"
                >
                    Reset
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Price Range */}
                <div>
                    <label className="font-medium mb-3 block">Price per Day</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            className="w-full p-2 border rounded-lg"
                            {...register('minPrice')}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            className="w-full p-2 border rounded-lg"
                            {...register('maxPrice')}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <label className="font-medium mb-3 block">Car Category</label>
                    <div className="space-y-2">
                        {['Sedan', 'SUV', 'Luxury', 'Sports', 'Hatchback', 'Van'].map((category) => (
                            <label key={category} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={category}
                                    {...register('categories')}
                                    className="rounded text-primary focus:ring-primary"
                                />
                                <span className="text-gray-600">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Transmission */}
                <div>
                    <label className="font-medium mb-3 block">Transmission</label>
                    <div className="space-y-2">
                        {['Automatic', 'Manual'].map((type) => (
                            <label key={type} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={type}
                                    {...register('transmission')}
                                    className="text-primary focus:ring-primary"
                                />
                                <span className="text-gray-600">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Apply Filters
                </Button>
            </form>
        </div>
    );
};

export default FilterPanel;
