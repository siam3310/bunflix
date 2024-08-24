import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SearchBarFocusProvider } from "@/context/searchContext";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SearchBarFocusProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
          <SpeedInsights />
          <Analytics />
          <Toaster closeButton richColors />
        </body>
      </SearchBarFocusProvider>
    </html>
  );
}
