import type { Metadata } from "next";
import { Geist, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Tipografía para Títulos (Moderna, Tech, Ancha)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Tipografía para Código/Tecnologías (Terminal vibe)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joel Matamala | Software Engineer & Data",
  description: "Portafolio de Joel Matamala. Desarrollo Full Stack, Mobile y Análisis de Datos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#050505] text-zinc-300 selection:bg-purple-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}