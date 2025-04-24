import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary: {
          "50": "#fffaec",
          "100": "#fff4d3",
          "200": "#ffe4a5",
          "300": "#ffd06d",
          "400": "#ffaf32",
          "500": "#ff950a",
          base: "#ff7d00",
          "700": "#cc5b02",
          "800": "#a1460b",
          "900": "#823b0c",
          "950": "#461c04",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
