import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Car, DollarSign, Calendar } from 'lucide-react';
import Button from '../components/UI/Button';
import CarList from '../components/Cars/CarList'; // We might need a table view, but List is fine for now
import { getAllCars } from '../services/carService';
import { useAuth } from '../contexts/AuthContext';

const VendorDashboard = () => {
    const { currentUser } = useAuth();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            fetchVendorCars();
        }
    }, [currentUser]);

    const fetchVendorCars = async () => {
        setLoading(true);
        try {
            // We need to implement filtering by vendorId in the API
            // passing vendorId to getAllCars
            const data = await getAllCars({ vendorId: currentUser.uid });
            setCars(data);
        } catch (error) {
            console.error('Failed to fetch vendor cars', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
                        <p className="text-gray-600">Manage your listings and bookings</p>
                    </div>
                    <Link to="/vendor/add-car">
                        <Button icon={Plus}>Add New Car</Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Car className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Cars</p>
                                <h3 className="text-2xl font-bold">{cars.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Earnings</p>
                                <h3 className="text-2xl font-bold">$0</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Active Bookings</p>
                                <h3 className="text-2xl font-bold">0</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Cars Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold">My Cars</h2>
                    </div>
                    <div className="p-6">
                        <CarList cars={cars} isLoading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
