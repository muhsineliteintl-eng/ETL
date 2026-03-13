import { Outfit, Inter } from 'next/font/google';
import '../styles/globals.css';
import ClientLayout from './ClientLayout';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


export const metadata = {
    metadataBase: new URL('https://elite-intl-kw.com'),
    title: {
        default: 'Elite International Company | Facility Management Specialists Kuwait',
        template: '%s | Elite International Company'
    },
    description: 'Leading provider of integrated facility management solutions in Kuwait. Specialist in Soft Services (Cleaning, Landscaping, Security) and Hard Services (HVAC, Electrical, Plumbing). Quality, Health, Safety, and Environment (QHSE) focused.',
    keywords: [
        'Facility Management Kuwait',
        'Commercial Cleaning Services Kuwait',
        'HVAC Maintenance Kuwait',
        'Security Guard Services Kuwait',
        'Integrated Facility Management',
        'Elite International PFM',
        'Kuwait Facility Services',
        'Hospital Cleaning Kuwait',
        'Office Maintenance Services'
    ],
    authors: [{ name: 'Elite International Company' }],
    creator: 'Elite International Company',
    publisher: 'Elite International Company',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Elite International Company | Facility Management Industry Leader in Kuwait',
        description: 'Elite International Company provides world-class hard and soft facility management services across Kuwait. Precision, Care, Commitment in every project.',
        url: 'https://elite-intl-kw.com',
        siteName: 'Elite International Company',
        images: [
            {
                url: '/logo.jpg',
                width: 1200,
                height: 630,
                alt: 'Elite International Company - Integrated Facility Management'
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Elite International Company For Public Facility Management",
        "url": "https://elite-intl-kw.com",
        "logo": "https://elite-intl-kw.com/logo.jpg",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": ["+965-6994-6970", "+965-6069-6065", "+965-6502-8931"],
            "contactType": "customer service",
            "areaServed": "KW",
            "availableLanguage": ["en", "ar"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kuwait City",
            "addressRegion": "Jaleeb Al-Shuwaik",
            "addressCountry": "KW"
        },
        "sameAs": [
            // Add social media links here
        ]
    };

    return (
        <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
            <head>
                <link rel="icon" href="/logo.jpg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="relative" suppressHydrationWarning={true}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
