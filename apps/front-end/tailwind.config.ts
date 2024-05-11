import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#32B7C5',
        primaryLight: '#0EFBEB',
        primaryDark: '#007B88',
      },
      fontFamily: {
        sans: ['var(--font-yekan)'],
        taha: ['var(--font-taha)'],
      },
    },
  },
  plugins: [],
};
export default config;
