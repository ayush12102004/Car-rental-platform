import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import Button from '../UI/Button';

const SearchBar = ({ onSearch, initialLocation = '' }) => {
    const [location, setLocation] = useState(initialLocation);
    const [dates, setDates] = useState({ start: '', end: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ location, ...dates });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Location</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="City, Airport, or Address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Pickup Date</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="date"
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        onChange={(e) => setDates({ ...dates, start: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Return Date</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="date"
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        onChange={(e) => setDates({ ...dates, end: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex items-end">
                <Button type="submit" className="w-full md:w-auto">
                    Search
                </Button>
            </div>
        </form>
    );
};

export default SearchBar;
