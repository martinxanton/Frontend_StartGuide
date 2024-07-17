/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        scaleUp: 'scaleUp 300ms ease-in-out forwards',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myLight: {
          colors: {
            'primary': {
              50: '#f4f8fd',
              100: '#e8f1fb',
              200: '#c6ddf4',
              300: '#a3c8ed',
              400: '#5e9fe0',
              500: '#1976d2',
              600: '#176abd',
              700: '#13599e',
              800: '#0f477e',
              900: '#0c3a67',
            },
            'secondary': {
              50: '#f4fbfa',
              100: '#e9f6f5',
              200: '#c9e9e6',
              300: '#a8dbd7',
              400: '#67c1b8',
              500: '#26a69a',
              600: '#22958b',
              700: '#1d7d74',
              800: '#17645c',
              900: '#13514b',
            },
          },
          'primary': '#458eed',         //300,
          'primary-focus': '#458eed',   //400
          'primary-content': '#0c3a67', //900  
          'secondary': '#458eed',       //300
          'secondary-focus': '#67c1b8', //400
          'secondary-content': '#ffffff', //900
          'accent': colors.fuchsia[300],
          'accent-focus': colors.fuchsia[400],
          'accent-content': colors.fuchsia[900],
          'neutral': '#f2f2f2',
          'neutral-focus': colors.neutral[700],
          'neutral-content': colors.neutral[50],
          'base-100': '#ffffff',
          'base-200': '#f2f2f2',
          'base-300': '#e5e5e5',
          'base-content': colors.slate[900],
          'info': colors.sky[300],
          'info-content': colors.sky[900],
          'success': colors.emerald[400],
          'success-content': colors.emerald[900],
          'warning': colors.yellow[400],
          'warning-content': colors.yellow[900],
          'error': colors.rose[300],
          'error-content': colors.rose[900],
        },
        myDark: {
          colors: {
            'primary': {
              50: '#f4f8fd',
              100: '#e8f1fb',
              200: '#c6ddf4',
              300: '#a3c8ed',
              400: '#5e9fe0',
              500: '#1976d2',
              600: '#176abd',
              700: '#13599e',
              800: '#0f477e',
              900: '#0c3a67',
            },
            'secondary': {
              50: '#f4fbfa',
              100: '#e9f6f5',
              200: '#c9e9e6',
              300: '#a8dbd7',
              400: '#67c1b8',
              500: '#26a69a',
              600: '#22958b',
              700: '#1d7d74',
              800: '#17645c',
              900: '#13514b',
            },
          },
          'primary': '#458eed',         //700,
          'primary-focus': '#1976d2',   //500
          'primary-content': '#f4f8fd', //50  
          'secondary': '#458eed',       //700
          'secondary-focus': '#26a69a', //500
          'secondary-content': '#f4fbfa', //50
          'accent': colors.fuchsia[700],
          'accent-focus': colors.fuchsia[500],
          'accent-content': colors.fuchsia[50],
          'neutral': '#303340',
          'neutral-focus': colors.neutral[200],
          'neutral-content': '#ffffff',
          'base-100': '#434656',
          'base-200': '#303340',
          'base-300': '#282a36',
          'base-content': colors.slate[50],
          'info': colors.sky[300],
          'info-content': colors.sky[900],
          'success': colors.emerald[400],
          'success-content': colors.emerald[900],
          'warning': colors.yellow[400],
          'warning-content': colors.yellow[900],
          'error': colors.rose[300],
          'error-content': colors.rose[900],
        }
      },
      "light",
      "dark"
    ],
  },
}


