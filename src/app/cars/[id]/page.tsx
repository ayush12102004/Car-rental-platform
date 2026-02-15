'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Star, Users, MapPin, Shield, Calendar, ChevronLeft, ChevronRight, Heart, Share2, Check } from 'lucide-react';


interface Car {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    seats: number;
    transmission: string;
    fuel: string;
    doors: number;
    engine: string;
    mileage: string;
    ac: boolean;
    gps: boolean;
    bluetooth: boolean;
    usb: boolean;
    description: string;
    owner: {
        name: string;
        rating: number;
        trips: number;
    };
    location: string;
}

const carsData: Record<string, Car> = {
    '1': { id: 1, name: 'Tesla Model 3', category: 'Electric Sedan', price: 89, rating: 4.9, reviews: 156, seats: 5, transmission: 'Automatic', fuel: 'Electric', doors: 4, engine: '283 HP', mileage: 'Unlimited', ac: true, gps: true, bluetooth: true, usb: true, description: 'Experience the future of driving with the Tesla Model 3. This all-electric sedan offers incredible performance, cutting-edge technology, and zero emissions. Perfect for eco-conscious travelers who demand both luxury and sustainability.', owner: { name: 'Premium Auto Rentals', rating: 4.9, trips: 342 }, location: 'JFK Airport, New York' },
    '2': { id: 2, name: 'BMW X5', category: 'Luxury SUV', price: 120, rating: 4.8, reviews: 203, seats: 7, transmission: 'Automatic', fuel: 'Petrol', doors: 4, engine: '335 HP', mileage: 'Unlimited', ac: true, gps: true, bluetooth: true, usb: true, description: 'The BMW X5 combines commanding presence with luxurious comfort. With spacious seating for 7, this premium SUV is perfect for family trips or business travel, delivering an unparalleled driving experience.', owner: { name: 'Luxury Fleet Co', rating: 4.8, trips: 278 }, location: 'Manhattan, New York' },
    '3': { id: 3, name: 'Mercedes C-Class', category: 'Premium Sedan', price: 110, rating: 4.9, reviews: 178, seats: 5, transmission: 'Automatic', fuel: 'Hybrid', doors: 4, engine: '255 HP', mileage: 'Unlimited', ac: true, gps: true, bluetooth: true, usb: true, description: 'Sophisticated elegance meets modern engineering. The Mercedes C-Class delivers a smooth, refined drive with premium interior appointments and advanced safety features that redefine luxury sedan standards.', owner: { name: 'Elite Wheels', rating: 4.9, trips: 415 }, location: 'LaGuardia Airport, New York' },
};

const reviewsData = [
    { name: 'Alex Rivera', date: '2 weeks ago', rating: 5, text: 'Absolutely loved the car! Clean, well-maintained, and the pickup process was seamless. Will definitely book again.' },
    { name: 'Priya Sharma', date: '1 month ago', rating: 5, text: 'Great value for money. The car was exactly as described and the owner was very responsive. Highly recommend!' },
    { name: 'James Wilson', date: '1 month ago', rating: 4, text: 'Excellent car and service. Minor wait at pickup but everything else was perfect. The car drove beautifully.' },
];

export default function CarDetailPage() {
    const params = useParams();
    const carId = params.id as string;
    const car = carsData[carId] || carsData['1'];

    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [liked, setLiked] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const days = pickupDate && returnDate
        ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
        : 3;
    const totalPrice = car.price * days;

    const specs = [
        { label: 'Transmission', value: car.transmission, icon: '⚙️' },
        { label: 'Fuel', value: car.fuel, icon: '⛽' },
        { label: 'Seats', value: `${car.seats} seats`, icon: '💺' },
        { label: 'Doors', value: `${car.doors} doors`, icon: '🚪' },
        { label: 'Engine', value: car.engine, icon: '🔥' },
        { label: 'Mileage', value: car.mileage, icon: '📏' },
        { label: 'A/C', value: car.ac ? 'Yes' : 'No', icon: '❄️' },
        { label: 'GPS', value: car.gps ? 'Yes' : 'No', icon: '📍' },
    ];

    return (
        <div style={{ background: 'var(--color-bg-secondary)', minHeight: 'calc(100vh - 72px)' }}>
            <div className="container" style={{ padding: '24px', maxWidth: '1100px' }}>
                {/* Breadcrumb */}
                <Link href="/cars" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)', marginBottom: '20px', textDecoration: 'none',
                }}>
                    <ArrowLeft size={16} /> Back to results
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' }}>
                    {/* Left Column */}
                    <div>
                        {/* Image Gallery */}
                        <div style={{
                            borderRadius: 'var(--radius-xl)',
                            overflow: 'hidden',
                            background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
                            height: '360px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '6rem',
                            position: 'relative',
                            marginBottom: '24px',
                        }}>
                            🚗
                            <button onClick={() => setLiked(!liked)} style={{
                                position: 'absolute', top: '16px', right: '16px', width: '44px', height: '44px',
                                borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Heart size={20} fill={liked ? '#dc2626' : 'none'} color={liked ? '#dc2626' : '#64748b'} />
                            </button>
                            <button style={{
                                position: 'absolute', top: '16px', right: '70px', width: '44px', height: '44px',
                                borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b',
                            }}>
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* Title */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '12px' }}>
                                <div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{car.category}</span>
                                    <h1 style={{ fontSize: '1.75rem', marginTop: '4px' }}>{car.name}</h1>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Star size={18} fill="#fbbf24" color="#fbbf24" />
                                    <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>{car.rating}</span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>({car.reviews} reviews)</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                <MapPin size={14} /> {car.location}
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div style={{
                            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px',
                        }}>
                            <h3 style={{ fontSize: '1.063rem', marginBottom: '16px' }}>Specifications</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                                {specs.map((s, i) => (
                                    <div key={i} style={{
                                        padding: '12px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--color-bg-secondary)',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{s.icon}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>{s.label}</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{
                            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px',
                        }}>
                            <h3 style={{ fontSize: '1.063rem', marginBottom: '12px' }}>About This Car</h3>
                            <p style={{ fontSize: '0.938rem', lineHeight: 1.8 }}>{car.description}</p>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                                {['Bluetooth', 'USB Charging', 'Backup Camera', 'Cruise Control'].map(f => (
                                    <span key={f} style={{
                                        display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px',
                                        borderRadius: 'var(--radius-full)', background: 'var(--color-success-light)',
                                        fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-success)',
                                    }}>
                                        <Check size={12} /> {f}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div style={{
                            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)', padding: '24px',
                        }}>
                            <h3 style={{ fontSize: '1.063rem', marginBottom: '20px' }}>Reviews ({car.reviews})</h3>
                            {reviewsData.map((r, i) => (
                                <div key={i} style={{
                                    paddingBottom: '20px',
                                    marginBottom: '20px',
                                    borderBottom: i < reviewsData.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: '50%',
                                                background: 'linear-gradient(135deg, var(--color-primary-200), var(--color-primary-500))',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 700, color: 'white', fontSize: '0.813rem',
                                            }}>{r.name.charAt(0)}</div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{r.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{r.date}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} size={13} fill={s <= r.rating ? '#fbbf24' : '#e2e8f0'} color={s <= r.rating ? '#fbbf24' : '#e2e8f0'} />
                                            ))}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{r.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div style={{ position: 'sticky', top: '96px' }}>
                        <div style={{
                            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-xl)', padding: '28px', boxShadow: 'var(--shadow-md)',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                                <div>
                                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>${car.price}</span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>/day</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <span style={{ fontSize: '0.813rem', fontWeight: 600 }}>{car.rating}</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pick-up Date</label>
                                <input type="date" className="input" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Return Date</label>
                                <input type="date" className="input" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
                            </div>

                            <div style={{
                                padding: '16px', borderRadius: 'var(--radius-md)',
                                background: 'var(--color-bg-secondary)', marginBottom: '20px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>${car.price} × {days} days</span>
                                    <span style={{ fontWeight: 600 }}>${car.price * days}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Service fee</span>
                                    <span style={{ fontWeight: 600 }}>$15</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Insurance</span>
                                    <span style={{ fontWeight: 600 }}>${days * 12}</span>
                                </div>
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', paddingTop: '12px',
                                    borderTop: '1px solid var(--color-border)', marginTop: '8px',
                                }}>
                                    <span style={{ fontWeight: 700 }}>Total</span>
                                    <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--color-primary)' }}>${totalPrice + 15 + days * 12}</span>
                                </div>
                            </div>

                            <Link href={`/booking/${car.id}`} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                Book Now
                            </Link>

                            <div style={{ textAlign: 'center', marginTop: '12px' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Free cancellation up to 24h before pickup</span>
                            </div>
                        </div>

                        {/* Owner Card */}
                        <div style={{
                            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)', padding: '20px', marginTop: '16px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white',
                                }}>{car.owner.name.charAt(0)}</div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.938rem' }}>{car.owner.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        <Star size={12} fill="#fbbf24" color="#fbbf24" /> {car.owner.rating} · {car.owner.trips} trips
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @media (max-width: 768px) {
          .container > div[style] { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
