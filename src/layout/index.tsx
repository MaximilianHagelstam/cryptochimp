import { signIn, useSession } from "next-auth/react";
import Footer from "./footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();

  if (!session?.user && status !== "loading") signIn();

  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
