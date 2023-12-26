import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

export const metadata = {
  title: "CryptoChimp",
  description: "Crypto trading game",
  keywords: ["Next.js", "React", "Tailwind CSS", "Server Components"],
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
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-950">
        <Navbar
          isAuthed={!!user}
          userEmail={user?.email}
          userImage={user?.image}
          userName={user?.name}
        />
        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">{children}</div>
        </main>
      </body>
    </html>
  );
}
