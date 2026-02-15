'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Calendar, Car, CreditCard, MessageSquare, Star, TrendingUp, Clock, MapPin, ChevronRight } from 'lucide-react';

const upcomingBookings = [
    { id: 'BK-001', car: 'Tesla Model 3', date: 'Feb 20 - Feb 23', status: 'Confirmed', price: 267, location: 'JFK Airport' },
    { id: 'BK-002', car: 'BMW X5', date: 'Mar 5 - Mar 8', status: 'Pending', price: 360, location: 'Manhattan' },
];

const pastBookings = [
    { id: 'BK-098', car: 'Mercedes C-Class', date: 'Jan 15 - Jan 18', status: 'Completed', price: 330, rating: 5 },
    { id: 'BK-097', car: 'Audi A4', date: 'Dec 20 - Dec 25', status: 'Completed', price: 475, rating: 4 },
];

export default function DashboardPage() {
    const { user, userProfile, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 72px)' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 16px' }} />
                    <div className="skeleton" style={{ width: '200px', height: '20px', borderRadius: '8px' }} />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 'calc(100vh - 72px)', background: 'var(--color-bg-secondary)',
            }}>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
                    <h2 style={{ marginBottom: '8px' }}>Sign In Required</h2>
                    <p style={{ marginBottom: '24px' }}>Please sign in to view your dashboard.</p>
                    <Link href="/login" className="btn btn-primary btn-lg">Sign In</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--color-bg-secondary)', minHeight: 'calc(100vh - 72px)' }}>
            <div className="container" style={{ padding: '32px 24px' }}>
                {/* Welcome */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>
                        Welcome back, {userProfile?.name || 'there'}! 👋
                    </h1>
                    <p>Here&apos;s what&apos;s happening with your bookings.</p>
                </div>

                {/* Quick Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px',
                }}>
                    {[
                        { icon: <Car size={22} />, label: 'Active Bookings', value: '2', color: 'var(--color-primary)' },
                        { icon: <CreditCard size={22} />, label: 'Total Spent', value: '$1,432', color: 'var(--color-success)' },
                        { icon: <Star size={22} />, label: 'Avg Rating Given', value: '4.8', color: '#fbbf24' },
                        { icon: <TrendingUp size={22} />, label: 'Trips Completed', value: '12', color: 'var(--color-info)' },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                                background: `${stat.color}15`, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', color: stat.color,
                            }}>{stat.icon}</div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>{stat.label}</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    {/* Upcoming Bookings */}
                    <div style={{
                        background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)', padding: '24px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.063rem' }}>Upcoming Bookings</h3>
                            <Link href="/dashboard/bookings" style={{ fontSize: '0.813rem', fontWeight: 500 }}>View All</Link>
                        </div>
                        {upcomingBookings.map(booking => (
                            <div key={booking.id} style={{
                                padding: '16px', borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border-light)',
                                marginBottom: '12px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h4 style={{ fontSize: '0.938rem' }}>{booking.car}</h4>
                                    <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '0.813rem', color: 'var(--color-text-secondary)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={13} /> {booking.date}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={13} /> {booking.location}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>${booking.price}</span>
                                    <Link href={`/dashboard/bookings/${booking.id}`} style={{ fontSize: '0.813rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        Details <ChevronRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Past Bookings */}
                    <div style={{
                        background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)', padding: '24px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.063rem' }}>Recent Activity</h3>
                            <Link href="/dashboard/history" style={{ fontSize: '0.813rem', fontWeight: 500 }}>View All</Link>
                        </div>
                        {pastBookings.map(booking => (
                            <div key={booking.id} style={{
                                padding: '16px', borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border-light)',
                                marginBottom: '12px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h4 style={{ fontSize: '0.938rem' }}>{booking.car}</h4>
                                    <span className="badge badge-success">{booking.status}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.813rem', color: 'var(--color-text-secondary)' }}>
                                    <Calendar size={13} /> {booking.date}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
                                    <span style={{ fontWeight: 700 }}>${booking.price}</span>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} size={13} fill={s <= booking.rating ? '#fbbf24' : '#e2e8f0'} color={s <= booking.rating ? '#fbbf24' : '#e2e8f0'} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Link href="/cars" className="btn btn-secondary" style={{ width: '100%', marginTop: '8px', fontSize: '0.875rem' }}>
                            Book Another Car
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @media (max-width: 768px) {
          .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
