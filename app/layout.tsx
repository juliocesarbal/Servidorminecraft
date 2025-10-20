import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel Servidor Minecraft",
  description: "Controla tu servidor de Minecraft en AWS EC2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
