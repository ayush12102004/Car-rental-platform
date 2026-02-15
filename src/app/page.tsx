'use client';

import Link from 'next/link';
import { Search, MapPin, Calendar, Shield, Clock, Star, ChevronRight, Car, Users, CreditCard, Headphones } from 'lucide-react';
import { useState } from 'react';

const featuredCars = [
  { id: 1, name: 'Tesla Model 3', category: 'Electric Sedan', price: 89, rating: 4.9, reviews: 156, image: '🚗', seats: 5, transmission: 'Auto', fuel: 'Electric' },
  { id: 2, name: 'BMW X5', category: 'Luxury SUV', price: 120, rating: 4.8, reviews: 203, image: '🚙', seats: 7, transmission: 'Auto', fuel: 'Petrol' },
  { id: 3, name: 'Mercedes C-Class', category: 'Premium Sedan', price: 110, rating: 4.9, reviews: 178, image: '🏎️', seats: 5, transmission: 'Auto', fuel: 'Hybrid' },
  { id: 4, name: 'Ford Mustang', category: 'Sports Car', price: 150, rating: 4.7, reviews: 134, image: '🏎️', seats: 4, transmission: 'Manual', fuel: 'Petrol' },
];

const steps = [
  { icon: <Search size={28} />, title: 'Search', desc: 'Browse our wide selection of premium vehicles and find the perfect ride.' },
  { icon: <Calendar size={28} />, title: 'Book', desc: 'Select your dates, add extras, and reserve in just a few clicks.' },
  { icon: <CreditCard size={28} />, title: 'Pay', desc: 'Secure checkout with multiple payment options. No hidden fees.' },
  { icon: <Car size={28} />, title: 'Drive', desc: 'Pick up your car and enjoy the ride. 24/7 roadside assistance included.' },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '500+', label: 'Vehicles' },
  { value: '100+', label: 'Locations' },
  { value: '24/7', label: 'Support' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Business Traveler', text: 'Velocity Car made my business trip seamless. The car was spotless and the pickup process took less than 5 minutes!', rating: 5 },
  { name: 'Michael Chen', role: 'Road Trip Enthusiast', text: 'Best rental experience ever! Great selection of cars, transparent pricing, and the customer service is outstanding.', rating: 5 },
  { name: 'Emily Davis', role: 'Family Vacationer', text: 'We rented an SUV for our family vacation. Perfect vehicle, great price, and the child seats were already installed!', rating: 5 },
];

export default function HomePage() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#0b1120',
        overflow: 'hidden',
      }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/hero-video.mov" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', paddingTop: '40px', paddingBottom: '60px' }}>
          <div style={{ maxWidth: '720px' }}>
            <h1 className="animate-fade-in" style={{
              color: 'white',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
              animationDelay: '0.2s',
            }}>
              Find Your <span style={{
                background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Perfect Drive</span>
            </h1>
            <p className="animate-fade-in" style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '560px',
              animationDelay: '0.3s',
            }}>
              Unbeatable prices, unlimited miles, and flexible pickup. Experience premium car rental with Velocity Car.
            </p>
          </div>

          {/* Search Box */}
          <div className="animate-slide-up" style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            maxWidth: '900px',
            animationDelay: '0.4s',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              alignItems: 'end',
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Pickup Location
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="text"
                    placeholder="City or Airport"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'rgba(255,255,255,0.08)',
                      color: 'white',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Pick-up Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontSize: '0.875rem',
                    outline: 'none',
                    colorScheme: 'dark',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontSize: '0.875rem',
                    outline: 'none',
                    colorScheme: 'dark',
                  }}
                />
              </div>
              <Link href="/cars" className="btn btn-primary btn-lg" style={{
                width: '100%',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                gap: '8px',
              }}>
                <Search size={18} /> Search Cars
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-info" style={{ marginBottom: '12px' }}>Simple Process</span>
            <h2>How It Works</h2>
            <p style={{ maxWidth: '560px', margin: '12px auto 0', fontSize: '1.063rem' }}>
              Rent your dream car in just 4 easy steps. No hassle, no hidden fees.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
          }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '32px 24px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                transition: 'all var(--transition-base)',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-primary-50)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'var(--color-primary)',
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>Step {i + 1}</div>
                <h4 style={{ marginBottom: '8px' }}>{step.title}</h4>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-info" style={{ marginBottom: '8px' }}>Top Picks</span>
              <h2>Featured Vehicles</h2>
              <p style={{ marginTop: '8px' }}>Hand-picked premium vehicles for the best driving experience.</p>
            </div>
            <Link href="/cars" className="btn btn-secondary" style={{ gap: '6px' }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {featuredCars.map((car) => (
              <div key={car.id} className="card" style={{ cursor: 'pointer' }}>
                {/* Car Image placeholder */}
                <div style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  position: 'relative',
                }}>
                  {car.image}
                  <span className="badge badge-success" style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                  }}>Available</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.063rem', marginBottom: '2px' }}>{car.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{car.category}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <span style={{ fontSize: '0.813rem', fontWeight: 600 }}>{car.rating}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>({car.reviews})</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    margin: '16px 0',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border-light)',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      <Users size={13} /> {car.seats} seats
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      ⚙️ {car.transmission}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      ⛽ {car.fuel}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>${car.price}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/day</span>
                    </div>
                    <Link href={`/cars/${car.id}`} className="btn btn-primary btn-sm">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-info" style={{ marginBottom: '12px' }}>Why Velocity Car</span>
            <h2>Why Customers Love Us</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          }}>
            {[
              { icon: <CreditCard size={28} />, title: 'Best Prices', desc: 'Competitive rates with no hidden fees. Price match guarantee on all bookings.' },
              { icon: <Shield size={28} />, title: 'Fully Insured', desc: 'Comprehensive insurance coverage included. Drive with complete peace of mind.' },
              { icon: <Headphones size={28} />, title: '24/7 Support', desc: 'Round-the-clock customer support. We\'re always here when you need us.' },
              { icon: <Clock size={28} />, title: 'Easy Booking', desc: 'Book in under 2 minutes. Flexible cancellation up to 24 hours before pickup.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '32px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginBottom: '20px',
                }}>
                  {item.icon}
                </div>
                <h4 style={{ marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-info" style={{ marginBottom: '12px' }}>Testimonials</span>
            <h2>What Our Customers Say</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                padding: '32px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={16} fill={s <= t.rating ? '#fbbf24' : '#e2e8f0'} color={s <= t.rating ? '#fbbf24' : '#e2e8f0'} />
                  ))}
                </div>
                <p style={{ fontSize: '0.938rem', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary-200), var(--color-primary-500))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: 'white',
                    fontSize: '1rem',
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #0b1120, #1e3a8a)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '16px', fontSize: '2rem' }}>Ready to Hit the Road?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto 32px', fontSize: '1.063rem' }}>
            Join thousands of happy customers. Find your perfect ride today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/cars" className="btn btn-primary btn-lg" style={{
              background: 'white',
              color: 'var(--color-primary-dark)',
            }}>
              Browse Cars
            </Link>
            <Link href="/signup" className="btn btn-lg" style={{
              border: '2px solid rgba(255,255,255,0.3)',
              color: 'white',
              background: 'transparent',
            }}>
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
