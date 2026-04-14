import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(public)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brasil: {
            verde: "#337418",   // Verde Protagonista (Ação/Destaque)
            vinho: "#50062a",   // Roxo/Vinho Profundo (Tech/Cultura)
            preto: "#0F0F0F",   // Fundo Imersivo 1
            cinza: "#202020",   // Fundo Imersivo 2
            creme: "#F8F8F8",   // Texto e Contrastes Sofisticados
            amarelo: "#F59E0B", // Pontos de atenção
        },
      },
    },
  },
  plugins: [],
};
export default config;
