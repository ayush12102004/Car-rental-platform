import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import CarForm from '../components/Cars/CarForm';
import Button from '../components/UI/Button'; // Assuming Button component exists in UI folder

const AddCar = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate('/vendor/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom max-w-4xl">
                <div className="mb-6 flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/vendor/dashboard')}
                        className="mb-0"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add New Car</h1>
                    <p className="text-gray-600 mt-2">Fill in the details to list your car</p>
                </div>

                <CarForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
};

export default AddCar;
