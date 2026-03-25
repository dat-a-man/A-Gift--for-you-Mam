import type { Metadata, Viewport } from "next";
import { Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/templates/main-layout";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-serif",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#faf9f6",
};

export const metadata: Metadata = {
  title: {
    default: "Reflections",
    template: "%s | Reflections",
  },
  description:
    "Reflections on a life well-lived and the magic of everyday things.",
  keywords: [
    "Blog",
    "Life",
    "Ageing",
    "Curiosity",
    "Stories",
  ],
  authors: [{ name: "Reflections" }],
  creator: "Reflections",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Reflections",
    description:
      "Reflections on a life well-lived and the magic of everyday things.",
    siteName: "Reflections",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reflections",
    description:
      "Reflections on a life well-lived and the magic of everyday things.",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          oswald.variable,
          jetbrainsMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
