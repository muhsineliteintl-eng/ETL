"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '../../../components/Button';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Check if user is already authenticated on component mount
    useEffect(() => {
        const auth = sessionStorage.getItem('elite_admin_auth');
        if (auth) {
            // User is already logged in, redirect to dashboard
            router.push('/admin');
        }
    }, [router]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (error) setError(''); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Store token in sessionStorage for client-side checks
                sessionStorage.setItem('elite_admin_auth', data.token);
                
                // Wait a moment to ensure sessionStorage is set
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Successful login - redirect to admin dashboard
                console.log('Login successful, token stored, redirecting to /admin');
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary-navy flex items-center justify-center px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[450px] w-full bg-bg-dark p-12 rounded-[32px] border border-glass-border shadow-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-black mb-4 tracking-tight">
                        Admin <span className="text-accent-green">Portal</span>
                    </h1>
                    <p className="text-text-secondary">Please enter your credentials</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3"
                    >
                        <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                        <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary">
                            <User size={20} />
                        </div>
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="w-full py-5 pl-14 pr-6 rounded-2xl bg-white border border-black/10 text-text-primary outline-none focus:border-accent-green transition-all"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary">
                            <Lock size={20} />
                        </div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full py-5 pl-14 pr-6 rounded-2xl bg-white border border-black/10 text-text-primary outline-none focus:border-accent-green transition-all"
                            required
                            disabled={loading}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="py-5 text-lg font-bold"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Signing In...
                            </div>
                        ) : (
                            'Login to Dashboard'
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-text-secondary text-sm">
                        Elite International Company<br />
                        Admin Dashboard Access
                    </p>
                </div>
            </motion.div>
        </div>
    );
}