'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Car } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            router.push('/dashboard');
        } catch (err) {
            setError((err as Error).message || 'Failed to sign in. Please check your credentials.');
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
            <div style={{
                width: '100%',
                maxWidth: '440px',
            }}>
                {/* Header */}
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
                    <h2 style={{ marginBottom: '8px' }}>Welcome Back</h2>
                    <p style={{ fontSize: '0.938rem' }}>Sign in to your Velocity Car account</p>
                </div>

                {/* Form Card */}
                <div style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '32px',
                    boxShadow: 'var(--shadow-sm)',
                }}>
                    {error && (
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--color-error-light)',
                            color: 'var(--color-error)',
                            fontSize: '0.875rem',
                            marginBottom: '20px',
                            border: '1px solid rgba(220,38,38,0.2)',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '6px', color: 'var(--color-text)' }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="email"
                                    className="input"
                                    style={{ paddingLeft: '40px' }}
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <label style={{ fontSize: '0.813rem', fontWeight: 600, color: 'var(--color-text)' }}>Password</label>
                                <Link href="/forgot-password" style={{ fontSize: '0.813rem', fontWeight: 500 }}>Forgot?</Link>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input"
                                    style={{ paddingLeft: '40px', paddingRight: '44px' }}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--color-text-muted)',
                                    }}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={loading}
                            style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
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
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" style={{ fontWeight: 600 }}>Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
