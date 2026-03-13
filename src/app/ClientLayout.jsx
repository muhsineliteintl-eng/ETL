"use client";

import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DynamicBackground from '../components/DynamicBackground';
import { LoadingProvider, useLoading } from '../contexts/LoadingContext';

function ClientLayoutContent({ children }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');
    const { isPageLoading } = useLoading();

    if (isAdminRoute) {
        // Admin routes - no navbar, footer, or background
        return children;
    }

    // Regular routes - include navbar, footer, and background
    return (
        <>
            <DynamicBackground />
            {!isPageLoading && <Navbar />}
            <main className="min-h-screen relative z-[1]">
                {children}
            </main>
            {!isPageLoading && <Footer />}
        </>
    );
}

export default function ClientLayout({ children }) {
    return (
        <LoadingProvider>
            <ClientLayoutContent>{children}</ClientLayoutContent>
        </LoadingProvider>
    );
}