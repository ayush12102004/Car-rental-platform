'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Car, User, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const { user, userProfile, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/cars', label: 'Browse Cars' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const getDashboardLink = () => {
        if (!userProfile) return '/dashboard';
        if (userProfile.role === 'admin') return '/admin';
        if (userProfile.role === 'owner') return '/owner';
        return '/dashboard';
    };

    return (
        <>
            <nav style={{
                position: isHome ? 'absolute' : 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: isHome ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: isHome ? 'none' : 'blur(12px)',
                WebkitBackdropFilter: isHome ? 'none' : 'blur(12px)',
                borderBottom: isHome ? 'none' : '1px solid var(--color-border-light)',
                transition: 'all var(--transition-base)',
            }}>
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '72px',
                }}>
                    {/* Logo */}
                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: 'none',
                    }}>
                        <img src="/logo.png" alt="Velocity Car" style={{
                            height: '32px',
                            width: 'auto',
                            objectFit: 'contain',
                            filter: isHome ? 'brightness(0) invert(1)' : 'none',
                        }} />
                        <span style={{
                            fontSize: '1.35rem',
                            fontWeight: 800,
                            color: isHome ? 'white' : 'var(--color-text)',
                            letterSpacing: '-0.02em',
                        }}>
                            Velocity<span style={{ color: isHome ? '#93c5fd' : 'var(--color-primary)' }}>Car</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '32px',
                    }} className="desktop-nav">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} style={{
                                fontSize: '0.938rem',
                                fontWeight: 500,
                                color: isHome ? 'rgba(255,255,255,0.85)' : 'var(--color-text-secondary)',
                                transition: 'color var(--transition-fast)',
                                textDecoration: 'none',
                            }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth / Profile */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-nav">
                        {user ? (
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 16px',
                                        borderRadius: 'var(--radius-full)',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-bg)',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: 'var(--color-text)',
                                    }}
                                >
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <User size={16} color="#fff" />
                                    </div>
                                    <span>{userProfile?.name || 'Account'}</span>
                                    <ChevronDown size={14} />
                                </button>

                                {profileOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        marginTop: '8px',
                                        background: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        boxShadow: 'var(--shadow-lg)',
                                        minWidth: '200px',
                                        overflow: 'hidden',
                                        zIndex: 100,
                                    }}>
                                        <Link href={getDashboardLink()} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '12px 16px',
                                            color: 'var(--color-text)',
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                        }} onClick={() => setProfileOpen(false)}>
                                            <User size={16} /> Dashboard
                                        </Link>
                                        <button onClick={() => { logout(); setProfileOpen(false); }} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '12px 16px',
                                            width: '100%',
                                            border: 'none',
                                            background: 'none',
                                            cursor: 'pointer',
                                            color: 'var(--color-error)',
                                            fontSize: '0.875rem',
                                            borderTop: '1px solid var(--color-border-light)',
                                        }}>
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="btn btn-ghost" style={{ fontSize: '0.875rem', color: isHome ? 'white' : undefined }}>
                                    Login
                                </Link>
                                <Link href="/signup" className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            display: 'none',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isHome ? 'white' : 'var(--color-text)',
                        }}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="mobile-menu" style={{
                        padding: '16px 24px 24px',
                        borderTop: '1px solid var(--color-border-light)',
                        background: 'var(--color-bg)',
                    }}>
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} style={{
                                display: 'block',
                                padding: '12px 0',
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'var(--color-text-secondary)',
                                textDecoration: 'none',
                                borderBottom: '1px solid var(--color-border-light)',
                            }} onClick={() => setMobileOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                        <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                            {user ? (
                                <>
                                    <Link href={getDashboardLink()} className="btn btn-primary" style={{ flex: 1 }}
                                        onClick={() => setMobileOpen(false)}>Dashboard</Link>
                                    <button onClick={() => { logout(); setMobileOpen(false); }} className="btn btn-ghost"
                                        style={{ flex: 1 }}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="btn btn-secondary" style={{ flex: 1 }}
                                        onClick={() => setMobileOpen(false)}>Login</Link>
                                    <Link href="/signup" className="btn btn-primary" style={{ flex: 1 }}
                                        onClick={() => setMobileOpen(false)}>Get Started</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
            </nav>
            {!isHome && <div style={{ height: '72px' }} />}
        </>
    );
}
