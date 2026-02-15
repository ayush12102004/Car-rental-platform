import Link from 'next/link';
import { Car, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Blog', href: '/blog' },
            { label: 'Press', href: '/press' },
        ],
        support: [
            { label: 'Help Center', href: '/help' },
            { label: 'Safety', href: '/safety' },
            { label: 'Cancellation', href: '/cancellation' },
            { label: 'Contact Us', href: '/contact' },
        ],
        legal: [
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Cookie Policy', href: '/cookies' },
            { label: 'Licensing', href: '/licensing' },
        ],
    };

    const socialLinks = [
        { icon: <FaFacebookF size={16} />, href: '#', label: 'Facebook' },
        { icon: <FaTwitter size={16} />, href: '#', label: 'Twitter' },
        { icon: <FaInstagram size={16} />, href: '#', label: 'Instagram' },
        { icon: <FaLinkedinIn size={16} />, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer style={{
            background: 'var(--color-bg-secondary)',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '64px',
            paddingBottom: '24px',
        }}>
            <div className="container">
                {/* Main Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '48px',
                    marginBottom: '48px',
                }}>
                    {/* Brand Col */}
                    <div>
                        <Link href="/" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            textDecoration: 'none',
                            marginBottom: '16px',
                        }}>
                            <img src="/logo.png" alt="Velocity Car" style={{
                                height: '28px',
                                width: 'auto',
                                objectFit: 'contain',
                            }} />
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)' }}>
                                Velocity<span style={{ color: 'var(--color-primary)' }}>Car</span>
                            </span>
                        </Link>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '20px', maxWidth: '280px' }}>
                            Your premium car rental platform. Find the perfect ride for every journey.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.813rem', color: 'var(--color-text-secondary)' }}>
                                <Mail size={14} /> support@velocitycar.com
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.813rem', color: 'var(--color-text-secondary)' }}>
                                <Phone size={14} /> +1 (555) 123-4567
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.813rem', color: 'var(--color-text-secondary)' }}>
                                <MapPin size={14} /> New York, NY 10001
                            </span>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text)' }}>Company</h4>
                        {footerLinks.company.map(link => (
                            <Link key={link.href} href={link.href} style={{
                                display: 'block',
                                padding: '6px 0',
                                fontSize: '0.875rem',
                                color: 'var(--color-text-secondary)',
                                textDecoration: 'none',
                                transition: 'color var(--transition-fast)',
                            }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text)' }}>Support</h4>
                        {footerLinks.support.map(link => (
                            <Link key={link.href} href={link.href} style={{
                                display: 'block',
                                padding: '6px 0',
                                fontSize: '0.875rem',
                                color: 'var(--color-text-secondary)',
                                textDecoration: 'none',
                            }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text)' }}>Legal</h4>
                        {footerLinks.legal.map(link => (
                            <Link key={link.href} href={link.href} style={{
                                display: 'block',
                                padding: '6px 0',
                                fontSize: '0.875rem',
                                color: 'var(--color-text-secondary)',
                                textDecoration: 'none',
                            }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div style={{
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    <p style={{ fontSize: '0.813rem', color: 'var(--color-text-muted)' }}>
                        © {currentYear} Velocity Car. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {socialLinks.map(social => (
                            <a key={social.label} href={social.href} aria-label={social.label} style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '1px solid var(--color-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-text-secondary)',
                                transition: 'all var(--transition-fast)',
                                textDecoration: 'none',
                            }}>
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
