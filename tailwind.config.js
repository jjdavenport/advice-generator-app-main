/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    fontFamily: {
      custom: ["manrope", "sans-serif"],
    },
    extend: {
      fontSize: {
        customSize: "1.75rem", // Your custom size
      },
      colors: {
        lightCyan: "hsl(193, 38%, 86%)",
        neonGreen: "hsl(150, 100%, 66%)",
        grayishBlue: "hsl(217, 19%, 38%)",
        darkGrayishBlue: "hsl(217, 19%, 24%)",
        darkBlue: "hsl(218, 23%, 16%)",
      },
    },
  },
  plugins: [],
};
