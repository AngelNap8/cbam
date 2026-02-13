import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // EU Blue - Official EU flag color
                'eu-blue': {
                    50: '#e6f0ff',
                    100: '#b3d1ff',
                    200: '#80b3ff',
                    300: '#4d94ff',
                    400: '#1a75ff',
                    500: '#003399', // Primary EU Blue
                    600: '#002b80',
                    700: '#002266',
                    800: '#001a4d',
                    900: '#001133',
                },
                // Carbon Green - Environmental accent
                'carbon': {
                    50: '#e6f7f0',
                    100: '#b3e8d4',
                    200: '#80d9b8',
                    300: '#4dca9c',
                    400: '#1abc80',
                    500: '#00a86b', // Primary Carbon Green
                    600: '#008f5b',
                    700: '#00754b',
                    800: '#005c3b',
                    900: '#00422b',
                },
                // Neutral slate for professional look
                'slate': {
                    950: '#0a0f1a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;
