import type { Metadata } from "next";
import {Roboto} from 'next/font/google';
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import FavoriteProvider from "./context/FavoriteProvider";

export const metadata: Metadata = {
  title: "Rick-App",
  description: "This aplication for search rick and morty characters",
};
const roboto = Roboto({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <FavoriteProvider>
    <html lang="en">
      <body className={`${roboto.className} bg-[#000] text-white`}>
      <header>
        <Navbar/>
      </header>
        {children}
      </body>
    </html>
   </FavoriteProvider> 
    
  );
}
