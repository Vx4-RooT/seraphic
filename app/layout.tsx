import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SERAPHIC — A Universe of Her Own",
  description: "A small universe made just for Seraphic. Happy birthday.",
  applicationName: "SERAPHIC",
};

export const viewport: Viewport = {
  themeColor: "#080916",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
