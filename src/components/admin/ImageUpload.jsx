"use client";

import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ value, onChange, recommendedSize }) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);

    const handleFile = async (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'general'); // Default folder

        try {
            // Get auth token from sessionStorage
            const auth = sessionStorage.getItem('elite_admin_auth');
            if (!auth) {
                throw new Error('Authentication required');
            }

            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth}`
                },
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const data = await res.json();
            onChange(data.url); // Use the Cloudinary URL
        } catch (err) {
            setError(err.message || 'Failed to upload image');
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[3px] block">Image Asset</label>

            <div
                className={`relative group bg-white/5 border-2 border-dashed rounded-[24px] overflow-hidden transition-all text-white
                    ${uploading ? 'border-accent-green bg-accent-green/10 cursor-not-allowed' : 
                      dragActive ? 'border-accent-green bg-accent-green/10' : 'border-white/10 hover:border-white/20'}
                `}
                onDragEnter={uploading ? undefined : handleDrag}
                onDragLeave={uploading ? undefined : handleDrag}
                onDragOver={uploading ? undefined : handleDrag}
                onDrop={uploading ? undefined : handleDrop}
            >
                {value ? (
                    <div className="relative h-48 w-full bg-black/20">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        {uploading && (
                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
                                <div className="w-8 h-8 border-4 border-accent-green border-t-transparent rounded-full animate-spin mb-4"></div>
                                <span className="text-accent-green font-bold text-sm">Uploading...</span>
                                <span className="text-white/60 text-xs mt-1">Replacing image</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <label className={`cursor-pointer bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all text-white ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <Upload size={20} />
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={handleChange} 
                                    accept="image/*" 
                                    disabled={uploading}
                                />
                            </label>
                            <button
                                onClick={() => onChange('')}
                                disabled={uploading}
                                className={`bg-red-500/10 hover:bg-red-500/20 text-red-500 p-3 rounded-xl transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center h-48 cursor-pointer relative">
                        {uploading && (
                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 rounded-[24px]">
                                <div className="w-8 h-8 border-4 border-accent-green border-t-transparent rounded-full animate-spin mb-4"></div>
                                <span className="text-accent-green font-bold text-sm">Uploading...</span>
                                <span className="text-white/60 text-xs mt-1">Please wait</span>
                            </div>
                        )}
                        <div className={`p-4 rounded-full mb-4 transition-all ${uploading ? 'bg-accent-green/20 text-accent-green animate-pulse' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white'}`}>
                            {uploading ? <Upload size={24} className="animate-bounce" /> : <ImageIcon size={24} />}
                        </div>
                        <span className="text-sm font-bold text-white/60 mb-1">
                            {uploading ? 'Uploading...' : 'Click or Drag Image'}
                        </span>
                        {recommendedSize && (
                            <span className="text-[10px] font-mono text-white/30 bg-black/20 px-2 py-1 rounded">
                                Size: {recommendedSize}
                            </span>
                        )}
                        <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleChange} 
                            accept="image/*" 
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
