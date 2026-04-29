import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/shared/components/AuthProvider";
import { MatrixBackground } from "@/shared/components/ui/MatrixBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HackCoda Platform",
  description: "A modern platform for the HackCoda community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased min-h-screen text-white font-sans relative selection:bg-brasil-verde selection:text-black">
        <AuthProvider>
          <MatrixBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
