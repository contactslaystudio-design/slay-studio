import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        creme: "#f0efe9", blanc: "#fffdef", ciel: "#d2e8ff",
        or: "#fae38f", bordeaux: "#861519", lime: "#c1ff72", encre: "#1a1208",
      },
      fontFamily: {
        sans: ["Cabinet Grotesk", "sans-serif"],
        serif: ["Ahsing", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
