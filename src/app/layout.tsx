import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

export const metadata = {
  title: "CryptoChimp",
  description: "Crypto trading game",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className="h-full bg-slate-50 text-slate-900">
        <div className="min-h-full">
          <Navbar
            isAuthed={!!user}
            userEmail={user?.email}
            userImage={user?.image}
            userName={user?.name}
          />
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">{children}</div>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
