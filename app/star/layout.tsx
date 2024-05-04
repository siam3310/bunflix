import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Starred - Nextflix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    { [children] }
    </>
  )
  
}
