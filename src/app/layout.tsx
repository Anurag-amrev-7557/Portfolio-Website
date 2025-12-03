import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anurag Verma — Software Engineer & AI Developer",
  description:
    "Software Engineer and AI Developer building scalable web applications, intelligent systems, and full-stack products with React, Next.js, Python, and cloud infrastructure.",
  keywords: [
    "software engineer",
    "AI developer",
    "full-stack developer",
    "React",
    "Next.js",
    "machine learning",
    "portfolio",
  ],
  openGraph: {
    title: "Anurag Verma — Software Engineer & AI Developer",
    description:
      "Building scalable applications, intelligent systems, and full-stack products for the modern web.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
