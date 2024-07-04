import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <Navbar />
        {children}
      <Toaster closeButton richColors />
      </body>
    </html>
  );
}
