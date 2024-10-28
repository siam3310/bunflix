import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import { Toaster } from "sonner";
import { SearchBarFocusProvider } from "@/context/searchContext";
import Providers from "@/context/tanstack-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <SearchBarFocusProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Toaster closeButton richColors />
          </body>
        </SearchBarFocusProvider>
      </Providers>
    </html>
  );
}
