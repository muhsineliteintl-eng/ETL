"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    
    // Check if current page has dark background
    const isDarkPage = pathname === '/careers' || pathname === '/contact';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle smooth scroll for anchor links
    const handleNavClick = (href) => {
        setIsOpen(false); // Close mobile menu
        
        if (href === '/' || href === '/#' || href === '/#hero') {
            // If we're not on the home page, navigate to home first
            if (pathname !== '/') {
                window.location.href = '/';
                return;
            }
            
            // If we're on home page, scroll to hero section
            const heroElement = document.getElementById('hero');
            if (heroElement) {
                heroElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback to scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        } else if (href.startsWith('/#')) {
            // If we're not on the home page, navigate to home first
            if (pathname !== '/') {
                window.location.href = href;
                return;
            }
            
            // If we're on home page, smooth scroll to section
            const targetId = href.substring(2); // Remove '/#'
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    const navLinks = [
        { name: 'Home', href: '/#hero' },
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        { name: 'Sectors', href: '/#sectors' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
                {/* Top Bar */}
                <div
                    className={`bg-white/80 text-text-secondary flex justify-end items-center text-[0.85rem] border-b border-black/5 transition-all duration-300 ${scrolled ? 'h-0 py-0 opacity-0' : 'h-10 py-2 px-8 opacity-100'
                        }`}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="max-w-[1200px] w-full mx-auto flex justify-end gap-8">
                        <a href="tel:+96569946970" className="flex items-center gap-2 transition-colors hover:text-accent-green">
                            <Phone size={14} color="var(--accent-green)" /> +965 6994 6970
                        </a>
                        <a href="tel:+96565028931" className="flex items-center gap-2 transition-colors hover:text-accent-green">
                            <Phone size={14} color="var(--accent-green)" /> +965 6502 8931
                        </a>
                        <a href="mailto:info@elitepfm.com" className="flex items-center gap-2 transition-colors hover:text-accent-green">
                            <Mail size={14} color="var(--accent-green)" /> info@elitepfm.com
                        </a>
                    </div>
                </div>

                {/* Main Navbar */}
                <div className={`transition-all duration-500 ${scrolled
                    ? 'bg-white/90 backdrop-blur-[20px] py-3 px-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-b border-black/8'
                    : 'bg-transparent py-6 px-8 border-b border-transparent'
                    }`}>
                    <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2 sm:gap-4 group min-w-0 shrink">
                            <div className="h-[40px] sm:h-[70px] w-auto flex items-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                                <img src="/images/logo.png" alt="Elite International Company" className="h-full w-auto object-contain" />
                            </div>
                            <div className="flex flex-col justify-center min-w-0">
                                <span className={`font-black leading-tight tracking-wide text-right mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis ${scrolled || isDarkPage ? 'text-text-primary text-[0.65rem] xs:text-[0.85rem] sm:text-[1.1rem]' : 'text-white text-[0.7rem] xs:text-[0.9rem] sm:text-[1.2rem]'}`} style={{ fontFamily: 'var(--font-outfit)', direction: 'rtl', textShadow: (scrolled || isDarkPage) ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}>
                                    شر كة النخبة الدولية لا دارة المر افق العا مة
                                </span>
                                <span className={`font-black leading-none tracking-[-0.5px] uppercase whitespace-nowrap overflow-hidden text-ellipsis ${scrolled ? 'text-accent-green text-[0.45rem] xs:text-[0.55rem] sm:text-[0.7rem]' : 'text-accent-green text-[0.5rem] xs:text-[0.6rem] sm:text-[0.75rem]'}`}>
                                    ELITE INTERNATIONAL COMPANY<br />
                                    FOR PUBLIC FACILITY MANAGEMENT
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="desktop-menu flex gap-8 items-center">
                            {navLinks.map((link) => (
                                link.href.startsWith('/#') ? (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        className={`font-semibold text-base transition-all duration-200 ${
                                            scrolled || isDarkPage ? 'text-text-primary' : 'text-white'
                                        }`}
                                        style={{ textShadow: (scrolled || isDarkPage) ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`font-semibold text-base transition-all duration-200 ${
                                            scrolled || isDarkPage ? 'text-text-primary' : 'text-white'
                                        }`}
                                        style={{ textShadow: (scrolled || isDarkPage) ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                            <Link href="/contact">
                                <Button variant="primary" className="text-base px-8 py-3 font-bold">Get Quote</Button>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <div
                            className={`mobile-toggle cursor-pointer ${scrolled || isDarkPage ? 'text-text-primary' : 'text-white'}`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white/98 backdrop-blur-[20px] overflow-hidden absolute top-full left-0 right-0 shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-[99] border-b border-black/10"
                        >
                            <div className="flex flex-col py-12 px-8 gap-8 items-center">
                                {navLinks.map((link) => (
                                    link.href.startsWith('/#') ? (
                                        <button
                                            key={link.name}
                                            onClick={() => handleNavClick(link.href)}
                                            className="text-gray-800 text-xl font-semibold transition-colors hover:text-accent-green"
                                        >
                                            {link.name}
                                        </button>
                                    ) : (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-gray-800 text-xl font-semibold transition-colors hover:text-accent-green"
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                ))}
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    <Button variant="primary">Get a Quote</Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <style jsx>{`
                    .mobile-toggle {
                        display: none !important;
                    }
                    @media (max-width: 900px) {
                        .desktop-menu {
                            display: none !important;
                        }
                        .mobile-toggle {
                            display: block !important;
                        }
                    }
                `}</style>
            </nav>
        </>
    );
}
