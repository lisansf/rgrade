import "./globals.css";

import Navbar from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Homepage | Retro Grade',
  description: 'Welcome to Retro Grade, your one-stop news source for gaming and tech.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo_White.png" />
      </head>
      <body>
        {/* Navbar */}
        <Navbar />

        <main className="flex flex-col max-w-[1365px] mx-auto">
          {children}
        </main>

        <div>
          <Footer />
        </div>

      </body>
    </html>
  );
}
