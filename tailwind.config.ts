import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(340, 65%, 47%)", 
        "primary-foreground": "white",
        muted: "hsl(0, 0%, 94%)",
        "muted-foreground": "hsl(0, 0%, 40%)",
        destructive: "hsl(0, 75%, 55%)",
      },
    },
  },
  plugins: [],
};

export default config;
