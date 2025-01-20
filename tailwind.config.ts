import type { Config } from "tailwindcss";

export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: `${breakpoints.mobile}px`,
      md: `${breakpoints.tablet}px`,
      xl: `${breakpoints.desktop}px`,
    },

    fontFamily: {
      opensans: ["var(--font-opensans)"],
    },

    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#16a34a",
        "hovered-accent": "#22c55e",
      },
    },
  },
  plugins: [],
} satisfies Config;
