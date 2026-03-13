"use client";

import { useState, useEffect } from 'react';

export function useImagePreloader(imageUrls) {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedCount, setLoadedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (!imageUrls || imageUrls.length === 0) {
            setImagesLoaded(true);
            return;
        }

        setTotalCount(imageUrls.length);
        setLoadedCount(0);

        let loadedImages = 0;
        const imagePromises = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    loadedImages++;
                    setLoadedCount(loadedImages);
                    resolve(url);
                };
                img.onerror = () => {
                    loadedImages++;
                    setLoadedCount(loadedImages);
                    resolve(url); // Still resolve to continue loading other images
                };
                img.src = url;
            });
        });

        Promise.all(imagePromises).then(() => {
            setImagesLoaded(true);
        });
    }, [imageUrls]);

    return {
        imagesLoaded,
        loadedCount,
        totalCount,
        progress: totalCount > 0 ? (loadedCount / totalCount) * 100 : 100
    };
}

export function useImageLoader(src) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!src) {
            setLoaded(true);
            return;
        }

        const img = new Image();
        img.onload = () => setLoaded(true);
        img.onerror = () => {
            setError(true);
            setLoaded(true);
        };
        img.src = src;
    }, [src]);

    return { loaded, error };
}