import daisyui from 'daisyui'; // Importing daisyui

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Using daisyui as a plugin
  daisyui: {
    themes: ["night"], // Enable multiple themes
  },
}