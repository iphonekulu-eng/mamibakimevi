import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mami Bakimevi",
  description:
    "Yaşlı ve hasta bakımı için admin kontrollü bakıcı eşleştirme platformu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${manrope.variable} ${cormorant.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
