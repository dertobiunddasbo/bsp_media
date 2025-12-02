/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#1e282d',
        'accent': '#e60050',
        'white': '#ffffff',
      },
      fontFamily: {
        sans: ['Kanit', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'semibold': '600',
        'bold': '700',
      },
    },
  },
  plugins: [],
}

