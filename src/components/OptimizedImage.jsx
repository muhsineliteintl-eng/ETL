"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OptimizedImage({ 
    src, 
    alt, 
    className = "", 
    containerClassName = "",
    showLoader = true,
    fallbackSrc = "/images/logo.png",
    priority, // Remove this prop - not used in regular img
    fill, // Remove this prop - not used in regular img
    ...props 
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        console.error('Image failed to load:', src);
        setHasError(true);
        setIsLoading(false);
    };

    // Filter out Next.js Image specific props that don't belong on regular img elements
    const { 
        sizes, 
        quality, 
        placeholder, 
        blurDataURL, 
        loader,
        unoptimized,
        ...imgProps 
    } = props;

    return (
        <div className={`relative ${containerClassName}`}>
            {/* Loading Skeleton */}
            <AnimatePresence>
                {isLoading && showLoader && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded`}
                    >
                        <motion.div
                            animate={{ x: ['0%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual Image */}
            <motion.img
                src={hasError ? fallbackSrc : src}
                alt={alt}
                className={className}
                onLoad={handleLoad}
                onError={handleError}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ display: isLoading ? 'none' : 'block' }}
                {...imgProps}
            />

            {/* Error State */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
                    <div className="text-center text-gray-500">
                        <div className="w-8 h-8 mx-auto mb-2 opacity-50">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-xs">Image unavailable</p>
                    </div>
                </div>
            )}
        </div>
    );
}