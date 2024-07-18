import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { IS_PROD } from "@/lib/constants";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-950 antialiased dark:bg-gray-950 dark:text-gray-50">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Sidebar />
          <main className="ml-0 min-h-full md:ml-64">
            <Navbar />
            <div className="container px-4 py-6 pt-6 sm:px-6">{children}</div>
          </main>
        </ThemeProvider>
        <Analytics mode={IS_PROD ? "production" : "development"} />
      </body>
    </html>
  );
}
