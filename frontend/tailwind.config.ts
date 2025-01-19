import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: {
          DEFAULT: '#000000', // Black as the default color
          50: '#f5f5f5',      // Light gray
          100: '#e0e0e0',     // Lighter gray
          200: '#b3b3b3',     // Gray
          300: '#808080',     // Medium gray
          400: '#4d4d4d',     // Darker gray
          500: '#333333',     // Even darker gray
          600: '#1a1a1a',     // Very dark gray
          700: '#0d0d0d',     // Almost black
          800: '#050505',     // Near black
          900: '#000000'      // Pure black
        },        
        text: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
