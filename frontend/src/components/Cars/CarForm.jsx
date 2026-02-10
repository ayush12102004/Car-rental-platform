import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader } from 'lucide-react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { createCar } from '../../services/carService';
import { uploadCarImages } from '../../services/uploadService';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const CarForm = ({ onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useAuth();
    const toast = useToast();

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(prev => [...prev, ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))]);
        }
    });

    const removeFile = (file) => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const onSubmit = async (data) => {
        if (files.length === 0) {
            toast.error('Please upload at least one photo');
            return;
        }

        setIsLoading(true);
        try {
            // 1. Create car document first to get ID (or upload first, but getting ID is better)
            // Actually we will upload images first with a temp ID or just 'temp' and then move? 
            // Or just upload to `cars/temp/${filename}` and return URLs.
            // Better: Create car with empty photos array, get ID, then upload, then update car.
            // For simplicity in this implementation: Upload to `cars/uploads` and use URLs.

            // Upload images
            toast.info('Uploading images...');
            const photoUrls = await uploadCarImages(files, `new_${Date.now()}`); // Using timestamp as temp ID

            const carData = {
                ...data,
                vendorId: currentUser.uid,
                price: Number(data.price),
                year: Number(data.year),
                seatingCapacity: Number(data.seatingCapacity),
                photos: photoUrls,
                primaryPhoto: photoUrls[0],
                location: {
                    address: data.address,
                    city: data.city
                },
                features: data.features ? data.features.split(',').map(f => f.trim()) : []
            };

            await createCar(carData);
            toast.success('Car listed successfully!');
            onSuccess?.();
        } catch (error) {
            console.error(error);
            toast.error('Failed to create car listing');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Car Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
                <Input label="Make" placeholder="Toyota" {...register('make', { required: 'Make is required' })} error={errors.make?.message} />
                <Input label="Model" placeholder="Camry" {...register('model', { required: 'Model is required' })} error={errors.model?.message} />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <Input label="Year" type="number" {...register('year', { required: 'Year is required' })} error={errors.year?.message} />
                <Input label="Price per Day ($)" type="number" {...register('price', { required: 'Price is required' })} error={errors.price?.message} />
                <Input label="Seating Capacity" type="number" {...register('seatingCapacity', { required: 'Required' })} error={errors.seatingCapacity?.message} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                    <select {...register('transmission')} className="w-full p-2 border rounded-lg">
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                    <select {...register('fuelType')} className="w-full p-2 border rounded-lg">
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select {...register('category')} className="w-full p-2 border rounded-lg">
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Sports">Sports</option>
                    <option value="Van">Van</option>
                </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <Input label="Address" placeholder="123 Main St" {...register('address', { required: 'Address is required' })} error={errors.address?.message} />
                <Input label="City" placeholder="New York" {...register('city', { required: 'City is required' })} error={errors.city?.message} />
            </div>

            <Input label="Features (comma separated)" placeholder="GPS, Bluetooth, Sunroof" {...register('features')} />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                    <input {...getInputProps()} />
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Drag & drop photos here, or click to select</p>
                </div>

                {/* Previews */}
                {files.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {files.map((file, index) => (
                            <div key={index} className="relative aspect-video rounded-lg overflow-hidden group">
                                <img src={file.preview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeFile(file)}
                                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
                List Car
            </Button>
        </form>
    );
};

export default CarForm;
