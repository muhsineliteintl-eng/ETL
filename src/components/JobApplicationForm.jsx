"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export default function JobApplicationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        position: '',
        coverLetter: '',
        resume: null
    });
    const [status, setStatus] = useState({ loading: false, success: null, message: '' });

    const handleChange = (e) => {
        if (e.target.name === 'resume') {
            const file = e.target.files[0];
            if (file) {
                // Validate file size (5MB limit)
                if (file.size > 5 * 1024 * 1024) {
                    setStatus({ 
                        loading: false, 
                        success: false, 
                        message: 'Resume file size must be less than 5MB. Please choose a smaller file.' 
                    });
                    e.target.value = ''; // Clear the file input
                    return;
                }
                
                // Validate file type
                if (!file.type.includes('pdf') && !file.type.includes('doc')) {
                    setStatus({ 
                        loading: false, 
                        success: false, 
                        message: 'Resume must be a PDF or DOC file.' 
                    });
                    e.target.value = ''; // Clear the file input
                    return;
                }
                
                // Clear any previous error messages
                setStatus({ loading: false, success: null, message: '' });
            }
            setFormData({ ...formData, resume: file });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: null, message: '' });

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });

            const res = await fetch('/api/careers', {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            if (result.success) {
                setStatus({ loading: false, success: true, message: result.message });
                setFormData({ firstName: '', lastName: '', phone: '', email: '', position: '', coverLetter: '', resume: null });
                // Reset file input
                e.target.reset();
            } else {
                throw new Error(result.message);
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
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="First Name"
                    className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                    required
                />
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email Address"
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
            <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                required
            >
                <option value="">Select Position</option>
                <option value="technician">Technician</option>
                <option value="cleaner">Cleaner</option>
                <option value="manager">Manager</option>
                <option value="supervisor">Supervisor</option>
            </select>

            <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2 ml-2">
                    Upload Resume (PDF or DOC, max 5MB)
                </label>
                <input
                    name="resume"
                    onChange={handleChange}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full p-4 rounded-2xl border border-black/10 bg-white text-text-primary text-sm outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-green/10 file:text-accent-green hover:file:bg-accent-green/20"
                    required
                />
                <p className="text-xs text-text-secondary mt-2 ml-2">
                    Supported formats: PDF, DOC, DOCX • Maximum file size: 5MB
                </p>
            </div>

            <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Cover Letter / Brief Profile"
                rows="4"
                className="w-full p-5 rounded-2xl border border-black/10 bg-white text-text-primary text-base mb-4 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] resize-vertical focus:border-accent-green focus:shadow-[0_4px_20px_rgba(0,132,80,0.1)]"
                required
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
                {status.loading ? 'Submitting...' : 'Submit Application'}
            </Button>
        </motion.form>
    );
}
