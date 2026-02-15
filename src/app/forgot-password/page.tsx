'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Mail, Car, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message || 'Failed to send reset email.');
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
            <div style={{ width: '100%', maxWidth: '440px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: 'var(--radius-lg)',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                    }}>
                        <Car size={28} color="white" />
                    </div>
                    <h2 style={{ marginBottom: '8px' }}>Reset Password</h2>
                    <p style={{ fontSize: '0.938rem' }}>Enter your email and we&apos;ll send you a reset link</p>
                </div>

                <div style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '32px',
                    boxShadow: 'var(--shadow-sm)',
                }}>
                    {success ? (
                        <div style={{ textAlign: 'center' }}>
                            <CheckCircle size={48} color="var(--color-success)" style={{ marginBottom: '16px' }} />
                            <h3 style={{ marginBottom: '8px' }}>Check Your Email</h3>
                            <p style={{ fontSize: '0.875rem', marginBottom: '24px' }}>
                                We&apos;ve sent a password reset link to <strong>{email}</strong>
                            </p>
                            <Link href="/login" className="btn btn-primary" style={{ width: '100%' }}>
                                Back to Sign In
                            </Link>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div style={{
                                    padding: '12px 16px', borderRadius: 'var(--radius-md)',
                                    background: 'var(--color-error-light)', color: 'var(--color-error)',
                                    fontSize: '0.875rem', marginBottom: '20px',
                                }}>
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '0.813rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                        <input className="input" type="email" style={{ paddingLeft: '40px' }} placeholder="you@example.com"
                                            value={email} onChange={e => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}
                                    style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                            <div style={{
                                textAlign: 'center', marginTop: '24px', paddingTop: '24px',
                                borderTop: '1px solid var(--color-border-light)',
                            }}>
                                <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 500 }}>
                                    <ArrowLeft size={14} /> Back to Sign In
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
