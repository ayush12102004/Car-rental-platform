import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import SearchBar from '../components/Search/SearchBar';
import FilterPanel from '../components/Search/FilterPanel';
import CarList from '../components/Cars/CarList';
import Button from '../components/UI/Button';
import { getAllCars } from '../services/carService';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const initialLocation = searchParams.get('location') || '';

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        location: initialLocation,
    });

    useEffect(() => {
        fetchCars();
    }, [filters]);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const data = await getAllCars(filters);
            setCars(data);
        } catch (error) {
            console.error('Failed to fetch cars', error);
            // In a real app, show error toast
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchData) => {
        setFilters(prev => ({ ...prev, ...searchData }));
    };

    const handleFilter = (filterData) => {
        setFilters(prev => ({ ...prev, ...filterData }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Search Header */}
            <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
                <div className="container-custom py-4">
                    <SearchBar onSearch={handleSearch} initialLocation={initialLocation} />
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-4">
                        <Button
                            variant="outline"
                            icon={Filter}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full justify-center"
                        >
                            Filters
                        </Button>
                    </div>

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-1/4">
                        <FilterPanel
                            onFilter={handleFilter}
                            isOpen={isFilterOpen}
                            onClose={() => setIsFilterOpen(false)}
                        />
                    </aside>

                    {/* Results */}
                    <main className="w-full lg:w-3/4">
                        <div className="mb-6 flex justify-between items-center">
                            <h1 className="text-2xl font-bold">
                                {loading ? 'Searching...' : `${cars.length} cars found`}
                            </h1>
                            <div className="text-gray-500 text-sm">
                                Sort by: Recommended
                            </div>
                        </div>

                        <CarList cars={cars} isLoading={loading} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
