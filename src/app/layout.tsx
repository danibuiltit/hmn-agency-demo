import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HMN.AGENCY Demo",
  description: "Standalone HMN.AGENCY internal CRM preview extracted from the Monolyth portfolio.",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
