import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/Theme/theme-provider";
import SessionWrapper from "@/components/Authorization/SessionWrapper";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Blog Application By AS",
  description:
    "This is a fully functional blog application using nextjs where you can create, edit, update and delete your posts.",
  icons: "/favicon/blog_icon.png",
};

const inter = Work_Sans({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
            <Footer />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
