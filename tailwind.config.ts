import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6A0DAD', // Warna ungu sesuai desain
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-moving': 'linear-gradient(-45deg, #8b5cf6, #7c3aed, #c084fc,#e9d5ff)',
      },
      backgroundSize: {
        '400': '400% 400%',
      },
      animation: {
        'gradient-move': 'gradientMove 10s ease infinite',
      },
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }
    },
  },
  plugins: [],
};

export default config;
