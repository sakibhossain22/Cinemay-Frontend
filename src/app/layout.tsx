import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html suppressHydrationWarning lang="en"  >
      <body
        className={`${inter.className}  text-zinc-100 antialiased min-h-screen flex flex-col`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-grow">
            {children}
          </main>
        </ThemeProvider>
        <Toaster richColors position="top-center" theme="dark" />
      </body>
    </html>
  );
}