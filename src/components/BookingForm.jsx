"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export default function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        details: ''
    });
    const [status, setStatus] = useState({ loading: false, success: null, message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: null, message: '' });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setStatus({ loading: false, success: true, message: data.message });
                setFormData({ name: '', phone: '', email: '', service: '', date: '', details: '' });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setStatus({ loading: false, success: false, message: error.message });
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-bg-dark p-12 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5"
        >
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                    required
                />
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                    required
                />
            </div>
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                required
            />
            <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                required
            >
                <option value="">Service Required</option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
                <option value="security">Security</option>
                <option value="hvac">HVAC Services</option>
                <option value="other">Other Services</option>
            </select>
            <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                type="date"
                className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                required
            />
            <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Additional Details"
                rows="4"
                className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] resize-vertical focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
            ></textarea>

            {status.message && (
                <div className={`p-4 rounded-lg mb-4 text-sm border ${status.success
                        ? 'bg-accent-green-glow text-accent-green border-accent-green'
                        : 'bg-red-500/10 text-red-500 border-red-500'
                    }`}>
                    {status.message}
                </div>
            )}

            <Button variant="primary" className="w-full" disabled={status.loading}>
                {status.loading ? 'Processing...' : 'Book Service'}
            </Button>
        </motion.form>
    );
}
