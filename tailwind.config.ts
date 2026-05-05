import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(public)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brasil: {
            verde: "#5DD62C",   // Verde Protagonista (Ação/Destaque neon)
            verdeEscuro: "#337418", // Verde escuro (Para fundos e sombras)
            preto: "#0F0F0F",   // Fundo Imersivo 1
            cinza: "#202020",   // Fundo Imersivo 2
            creme: "#F8F8F8",   // Texto e Contrastes Sofisticados
        },
      },
      keyframes: {
        moveBg: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'gradient-x': 'moveBg 35s ease infinite',
      },
    },
  },
  plugins: [],
};
export default config;
