import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070A",
        backgroundSoft: "#080D12",
        surface: "#101820",
        surfaceSoft: "#151F2A",
        surfaceMuted: "#1B232D",

        chrome: "#C9D1D9",
        chromeLight: "#F2F5F8",
        chromeDark: "#7E8791",

        text: "#F5F7FA",
        muted: "#B8C3CF",
        mutedSoft: "#8E9AA8",

        electric: "#1E8CFF",
        electricLight: "#5AB2FF",
        electricDark: "#005FCC",

        gold: "#D6B15E",
        goldSoft: "#F1D991",
        goldDark: "#8F6D28",

        dangerSoft: "#2A171B",
        dangerBorder: "#7F3A46",

        border: "#2A3440",
        borderSoft: "#3A4653"
      },
      boxShadow: {
        electric: "0 0 32px rgba(30, 140, 255, 0.24)",
        electricStrong: "0 0 44px rgba(30, 140, 255, 0.38)",
        chrome: "0 18px 60px rgba(201, 209, 217, 0.08)",
        gold: "0 0 28px rgba(214, 177, 94, 0.18)",
        card: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "dama-radial":
          "radial-gradient(circle at top right, rgba(30, 140, 255, 0.16), transparent 32%), radial-gradient(circle at top left, rgba(201, 209, 217, 0.07), transparent 20%), linear-gradient(180deg, #05070A 0%, #080D12 100%)",
        "chrome-text":
          "linear-gradient(120deg, #8B949E 0%, #F2F5F8 28%, #C9D1D9 52%, #7E8791 78%, #F2F5F8 100%)",
        "metallic-card":
          "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))",
        "gold-line":
          "linear-gradient(90deg, rgba(214,177,94,0), rgba(214,177,94,0.65), rgba(214,177,94,0))"
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      maxWidth: {
        site: "1180px"
      }
    }
  },
  plugins: []
};

export default config;