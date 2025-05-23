import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        mygreen: "var(--color-mygreen)",
        myblack2: "var(--color-myblack2)",
        myblack: "var(--color-myblack)",
        myyellow: "var(--color-myyellow)",
        mywhite: "var(--color-mywhite)",
        darkgreen: "var(--color-darkgreen)",
        darkgreentwo: "var(--color-darkgreentwo)",
        mygrey: "var(--color-mygrey)",
        mygrey2: "var(--color-mygrey2)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
     
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        '325': '325',
        '350': '350',
        normal: '400',
        book: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      screens: {
        sm: "772px",
        md: "1040px",
        lg: "1350px",
      },
    },
  },
  plugins: [],
} satisfies Config;