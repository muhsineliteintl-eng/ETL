/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-navy': '#FFFFFF',
                'accent-green': '#008450',
                'accent-green-glow': 'rgba(0, 132, 80, 0.2)',
                'text-primary': '#1A1A1A',
                'text-secondary': '#4A4A4A',
                'bg-dark': '#F8F9FA',
                'bg-card': 'rgba(0, 0, 0, 0.03)',
                'glass-bg': 'rgba(0, 0, 0, 0.05)',
                'glass-border': 'rgba(0, 0, 0, 0.1)',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
                'gradient-accent': 'linear-gradient(90deg, #008450 0%, #0077CC 100%)',
            },
            fontFamily: {
                outfit: ['var(--font-outfit)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
