import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CinemaY - Watch Your Favorite Movies",
  description: "Advanced Movie Streaming Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.className} bg-black text-zinc-100 antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-grow">
          {children}
        </main>

        <Toaster richColors position="top-center" theme="dark" />
      </body>
    </html>
  );
}