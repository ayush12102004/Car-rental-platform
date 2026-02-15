'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, Phone, Car, Building } from 'lucide-react';

export default function SignupPage() {
    const [role, setRole] = useState<'customer' | 'owner'>('customer');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const router = useRouter();

    const getPasswordStrength = (pw: string) => {
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };

    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['#dc2626', '#d97706', '#0284c7', '#059669'];
    const strength = getPasswordStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const extra: Record<string, unknown> = { phone };
            if (role === 'owner') extra.businessName = businessName;
            await signup(email, password, name, role, extra);
            router.push('/dashboard');
        } catch (err) {
            setError((err as Error).message || 'Failed to create account. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 72px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            background: 'var(--color-bg-secondary)',
        }}>
            <div style={{ width: '100%', maxWidth: '480px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                    }}>
                        <Car size={28} color="white" />
                    </div>
                    <h2 style={{ marginBottom: '8px' }}>Create Account</h2>
                    <p style={{ fontSize: '0.938rem' }}>Join Velocity Car and start your journey</p>
                </div>

                <div style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '32px',
                    boxShadow: 'var(--shadow-sm)',
                }}>
                    {/* Role Selector */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '24px',
                    }}>
                        {(['customer', 'owner'] as const).map(r => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                style={{
                                    padding: '14px',
                                    borderRadius: 'var(--radius-md)',
                                    border: `2px solid ${role === r ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                    background: role === r ? 'var(--color-primary-50)' : 'transparent',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all var(--transition-fast)',
                                }}
                            >
                                <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                                    {r === 'customer' ? '🚗' : '🏢'}
                                </div>
                                <div style={{
                                    fontSize: '0.813rem',
                                    fontWeight: 600,
                                    color: role === r ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                }}>
                                    {r === 'customer' ? 'Customer' : 'Car Owner'}
                                </div>
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--color-error-light)',
                            color: 'var(--color-error)',
                            fontSize: '0.875rem',
                            marginBottom: '20px',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input className="input" style={{ paddingLeft: '40px' }} placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input className="input" type="email" style={{ paddingLeft: '40px' }} placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '6px' }}>Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input className="input" type="tel" style={{ paddingLeft: '40px' }} placeholder="+1 (555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                        </div>

                        {role === 'owner' && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '6px' }}>Business Name</label>
                                <div style={{ position: 'relative' }}>
                                    <Building size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input className="input" style={{ paddingLeft: '40px' }} placeholder="Your business name" value={businessName} onChange={e => setBusinessName(e.target.value)} />
                                </div>
                            </div>
                        )}

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '6px' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    className="input"
                                    type={showPassword ? 'text' : 'password'}
                                    style={{ paddingLeft: '40px', paddingRight: '44px' }}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
                                }}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {password && (
                                <div style={{ marginTop: '8px' }}>
                                    <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                                        {[0, 1, 2, 3].map(i => (
                                            <div key={i} style={{
                                                flex: 1,
                                                height: '3px',
                                                borderRadius: '2px',
                                                background: i < strength ? strengthColors[strength - 1] : 'var(--color-border)',
                                                transition: 'all var(--transition-fast)',
                                            }} />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: strength > 0 ? strengthColors[strength - 1] : 'var(--color-text-muted)' }}>
                                        {strength > 0 ? strengthLabels[strength - 1] : 'Enter password'}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '6px' }}>Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input className="input" type="password" style={{ paddingLeft: '40px' }} placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div style={{
                        textAlign: 'center',
                        marginTop: '24px',
                        paddingTop: '24px',
                        borderTop: '1px solid var(--color-border-light)',
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)',
                    }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ fontWeight: 600 }}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
