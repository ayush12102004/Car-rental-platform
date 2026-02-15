'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Users, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const allCars = [
    { id: 1, name: 'Tesla Model 3', category: 'Electric Sedan', price: 89, rating: 4.9, reviews: 156, image: '🚗', seats: 5, transmission: 'Auto', fuel: 'Electric', available: true },
    { id: 2, name: 'BMW X5', category: 'Luxury SUV', price: 120, rating: 4.8, reviews: 203, image: '🚙', seats: 7, transmission: 'Auto', fuel: 'Petrol', available: true },
    { id: 3, name: 'Mercedes C-Class', category: 'Premium Sedan', price: 110, rating: 4.9, reviews: 178, image: '🏎️', seats: 5, transmission: 'Auto', fuel: 'Hybrid', available: true },
    { id: 4, name: 'Ford Mustang', category: 'Sports Car', price: 150, rating: 4.7, reviews: 134, image: '🏎️', seats: 4, transmission: 'Manual', fuel: 'Petrol', available: false },
    { id: 5, name: 'Audi A4', category: 'Premium Sedan', price: 95, rating: 4.8, reviews: 167, image: '🚗', seats: 5, transmission: 'Auto', fuel: 'Petrol', available: true },
    { id: 6, name: 'Toyota Camry', category: 'Economy Sedan', price: 55, rating: 4.6, reviews: 312, image: '🚗', seats: 5, transmission: 'Auto', fuel: 'Hybrid', available: true },
    { id: 7, name: 'Jeep Wrangler', category: 'SUV', price: 105, rating: 4.5, reviews: 89, image: '🚙', seats: 5, transmission: 'Manual', fuel: 'Petrol', available: true },
    { id: 8, name: 'Honda Civic', category: 'Economy Sedan', price: 45, rating: 4.7, reviews: 245, image: '🚗', seats: 5, transmission: 'Auto', fuel: 'Petrol', available: true },
];

const categories = ['All', 'Economy', 'Premium', 'Luxury', 'SUV', 'Sports', 'Electric'];
const transmissions = ['All', 'Auto', 'Manual'];
const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];

export default function CarsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTransmission, setSelectedTransmission] = useState('All');
    const [selectedFuel, setSelectedFuel] = useState('All');
    const [priceRange, setPriceRange] = useState(200);
    const [sortBy, setSortBy] = useState('recommended');
    const [showFilters, setShowFilters] = useState(false);

    const filteredCars = allCars.filter(car => {
        if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (selectedCategory !== 'All' && !car.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
        if (selectedTransmission !== 'All' && car.transmission !== selectedTransmission) return false;
        if (selectedFuel !== 'All' && car.fuel !== selectedFuel) return false;
        if (car.price > priceRange) return false;
        return true;
    }).sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
    });

    return (
        <div style={{ background: 'var(--color-bg-secondary)', minHeight: 'calc(100vh - 72px)' }}>
            {/* Search Header */}
            <div style={{
                background: 'linear-gradient(135deg, #0b1120, #1e3a8a)',
                padding: '40px 0 32px',
            }}>
                <div className="container">
                    <h1 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '16px' }}>Browse Cars</h1>
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        maxWidth: '600px',
                    }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search by make or model..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: 'var(--radius-md)',
                                    border: 'none',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                }}
                            />
                        </div>
                        <button
                            className="btn"
                            onClick={() => setShowFilters(!showFilters)}
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            <SlidersHorizontal size={16} /> Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    {/* Filters Sidebar */}
                    <div style={{
                        width: '260px',
                        flexShrink: 0,
                        display: showFilters ? 'block' : 'none',
                    }} className="filters-sidebar">
                        <div style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '24px',
                            position: 'sticky',
                            top: '96px',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4>Filters</h4>
                                <button onClick={() => setShowFilters(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Category */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '8px' }}>Category</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {categories.map(cat => (
                                        <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                                            padding: '6px 12px',
                                            borderRadius: 'var(--radius-full)',
                                            border: `1px solid ${selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                            background: selectedCategory === cat ? 'var(--color-primary-50)' : 'transparent',
                                            color: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                        }}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '8px' }}>
                                    Price Range: <span style={{ color: 'var(--color-primary)' }}>Up to ${priceRange}/day</span>
                                </label>
                                <input type="range" min="20" max="300" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--color-primary)' }} />
                            </div>

                            {/* Transmission */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '8px' }}>Transmission</label>
                                {transmissions.map(t => (
                                    <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', fontSize: '0.875rem', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                                        <input type="radio" name="transmission" checked={selectedTransmission === t} onChange={() => setSelectedTransmission(t)}
                                            style={{ accentColor: 'var(--color-primary)' }} />
                                        {t}
                                    </label>
                                ))}
                            </div>

                            {/* Fuel Type */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '8px' }}>Fuel Type</label>
                                {fuelTypes.map(f => (
                                    <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', fontSize: '0.875rem', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                                        <input type="radio" name="fuel" checked={selectedFuel === f} onChange={() => setSelectedFuel(f)}
                                            style={{ accentColor: 'var(--color-primary)' }} />
                                        {f}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div style={{ flex: 1 }}>
                        {/* Sort Bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            flexWrap: 'wrap',
                            gap: '12px',
                        }}>
                            <p style={{ fontSize: '0.875rem' }}>
                                <strong>{filteredCars.length}</strong> vehicles found
                            </p>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.813rem',
                                background: 'var(--color-surface)',
                                cursor: 'pointer',
                                outline: 'none',
                            }}>
                                <option value="recommended">Recommended</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        {/* Car Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '20px',
                        }}>
                            {filteredCars.map(car => (
                                <Link href={`/cars/${car.id}`} key={car.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="card" style={{ height: '100%' }}>
                                        <div style={{
                                            height: '180px',
                                            background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '3.5rem',
                                            position: 'relative',
                                        }}>
                                            {car.image}
                                            <span className={`badge ${car.available ? 'badge-success' : 'badge-error'}`} style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                            }}>
                                                {car.available ? 'Available' : 'Booked'}
                                            </span>
                                        </div>
                                        <div style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                <div>
                                                    <h4 style={{ fontSize: '1rem', marginBottom: '2px' }}>{car.name}</h4>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{car.category}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                    <Star size={13} fill="#fbbf24" color="#fbbf24" />
                                                    <span style={{ fontSize: '0.813rem', fontWeight: 600 }}>{car.rating}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '14px', margin: '12px 0', paddingTop: '10px', borderTop: '1px solid var(--color-border-light)' }}>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                    <Users size={12} /> {car.seats}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>⚙️ {car.transmission}</span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>⛽ {car.fuel}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary)' }}>${car.price}</span>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/day</span>
                                                </div>
                                                <span className="btn btn-primary btn-sm">View Deal</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filteredCars.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                                <h3 style={{ marginBottom: '8px' }}>No vehicles found</h3>
                                <p>Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @media (min-width: 769px) {
          .filters-sidebar { display: block !important; }
        }
      `}</style>
        </div>
    );
}
