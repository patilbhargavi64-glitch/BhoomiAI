/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        govt: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#166534',
          700: '#14532d',
          900: '#052e16'
        }
      }
    }
  },
  plugins: []
};
