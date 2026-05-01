import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, Noto_Serif_Ethiopic } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

const notoSerifAmharic = Noto_Serif_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["400", "600", "900"],
  variable: "--font-noto-serif-ethiopic",
});

export const metadata: Metadata = {
  title: "የአማርኛ ምሳሌያዊ አነጋገሮች | Amharic Proverbs with English Meaning",
  description: "Explore a rich collection of Amharic proverbs (የአማርኛ ምሳሌያዊ አነጋገሮች) with English translations and detailed meanings.",
  keywords: ["Amharic proverbs", "Ethiopian proverbs", "ምሳሌያዊ አነጋገሮች", "Amharic sayings", "Ethiopian wisdom"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="am"  className={`${playfair.variable} ${sourceSerif.variable} ${notoSerifAmharic.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
