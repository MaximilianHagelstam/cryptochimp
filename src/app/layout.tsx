import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  title: "CryptoChimp",
  description: "Crypto trading game",
  keywords: [
    "Crypto",
    "Bitcoin",
    "Ethereum",
    "Next.js",
    "React",
    "Tailwind CSS",
  ],
  authors: [
    {
      name: "Maximilian Hagelstam",
      url: "https://maximilian-hagelstam.vercel.app",
    },
  ],
  creator: "Maximilian Hagelstam",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-950 antialiased dark:bg-gray-950 dark:text-gray-50">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
