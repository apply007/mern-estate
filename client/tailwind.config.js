/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineClamp: {
        7: "7",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
