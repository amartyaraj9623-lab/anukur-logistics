/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#04080f',
          900: '#081225',
          850: '#0b1830',
          800: '#0f1e3a',
          700: '#16294d',
          600: '#1d3461',
        },
        ember: {
          400: '#ff8c3a',
          500: '#ff6a00',
          600: '#e55b00',
          700: '#b84800',
        },
        gold: {
          400: '#ffcf6b',
          500: '#ffb547',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'ember-glow': '0 0 24px -4px rgba(255, 106, 0, 0.55)',
        'ember-glow-lg': '0 0 48px -6px rgba(255, 106, 0, 0.45)',
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.7)',
      },
      animation: {
        'marquee': 'marquee 38s linear infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(255,106,0,0.6)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 6px rgba(255,106,0,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
