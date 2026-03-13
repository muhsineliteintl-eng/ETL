"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    // Handle smooth scroll for anchor links
    const handleNavClick = (e, href) => {
        if (href === '/' || href === '/#' || href === '/#hero') {
            e.preventDefault();
            
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
            e.preventDefault();
            
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

    return (
        <footer className="bg-primary-navy text-text-primary py-24 px-8 border-t border-white/5">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid md:grid-cols-3 gap-16 items-start">
                    {/* Brand */}
                    <div>
                        <div className="mb-8 w-[180px]">
                            <img src="/images/logo.png" alt="Elite International Company" className="w-full h-auto object-contain" />
                        </div>
                        <p className="text-text-secondary leading-relaxed text-base">
                            Elite International Company provides integrated facility management solutions across Kuwait. Precision, Care, and Commitment in every project.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-8 text-text-primary">Quick Links</h3>
                        <ul className="list-none space-y-4">
                            <li>
                                <a 
                                    href="/#hero" 
                                    onClick={(e) => handleNavClick(e, '/#hero')}
                                    className="text-text-secondary transition-colors hover:text-accent-green cursor-pointer"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/#about" 
                                    onClick={(e) => handleNavClick(e, '/#about')}
                                    className="text-text-secondary transition-colors hover:text-accent-green cursor-pointer"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/#services" 
                                    onClick={(e) => handleNavClick(e, '/#services')}
                                    className="text-text-secondary transition-colors hover:text-accent-green cursor-pointer"
                                >
                                    Our Services
                                </a>
                            </li>
                            <li>
                                <Link href="/careers" className="text-text-secondary transition-colors hover:text-accent-green">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-text-secondary transition-colors hover:text-accent-green">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-bold mb-8 text-text-primary">Get In Touch</h3>
                        <div className="space-y-5 text-text-secondary">
                            <div>
                                <span className="text-accent-green font-medium block mb-2">Location:</span>
                                <p className="text-sm leading-relaxed">
                                    Kuwait – Jaleeb Al-Shuwaik, Block 1<br />
                                    Faisal Al-Bander Al Duwaish Building No.24<br />
                                    2nd Floor, Office No.22
                                </p>
                            </div>
                            <div>
                                <span className="text-accent-green font-medium block mb-2">Phone:</span>
                                <p className="text-sm">+965 69946970</p>
                                <p className="text-sm">+965 60696065</p>
                                <p className="text-sm">+965 65028931</p>
                            </div>
                            <div>
                                <span className="text-accent-green font-medium block mb-2">Email:</span>
                                <a href="mailto:info@elitepfm.com " className="text-sm hover:text-accent-green transition-colors">
                                    info@elitepfm.com 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto text-center mt-24 pt-10 border-t border-white/5">
                <p className="text-text-secondary text-sm">
                    &copy; {new Date().getFullYear()} <span className="text-text-primary font-semibold">Elite International Company</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
}