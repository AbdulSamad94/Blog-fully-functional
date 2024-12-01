import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Header from "@/components/Header";

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
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
