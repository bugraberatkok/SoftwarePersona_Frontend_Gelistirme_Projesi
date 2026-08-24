/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand / Primary — warm gold/amber
        brand: {
          50:  '#FDF8ED',
          100: '#F9EDCC',
          200: '#F3D994',
          300: '#ECBF56',
          400: '#D4A036',
          500: '#C08B22',
          600: '#A26E1A',
          700: '#7D5316',
          800: '#5C3D14',
          900: '#3F2A10',
        },
        // Warm neutral backgrounds (customer side)
        cream: {
          50:  '#FFFDF9',
          100: '#FDF6EC',
          200: '#FAF0DE',
          300: '#F5E6C8',
          400: '#EDD6A8',
        },
        // Earth brown accents
        earth: {
          50:  '#FAF5F0',
          100: '#F0E4D6',
          200: '#DFCAB0',
          300: '#C9A87C',
          400: '#A8804C',
          500: '#7A5A32',
          600: '#5C4226',
          700: '#4A2C1A',
          800: '#3A2214',
          900: '#2A180E',
        },
        // Admin dark theme
        admin: {
          50:  '#E8E8F0',
          100: '#C4C4D4',
          200: '#9696B0',
          300: '#6A6A88',
          400: '#48486C',
          500: '#333352',
          600: '#2A2A3A',
          700: '#1E1E2E',
          800: '#161622',
          900: '#0E0E18',
        },
        // Status colors
        status: {
          new:       '#3B82F6', // blue
          preparing: '#F59E0B', // amber
          ready:     '#10B981', // emerald
          completed: '#6B7280', // gray
          cancelled: '#EF4444', // red
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(74,44,26,0.85) 0%, rgba(64,42,16,0.70) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
