import '../styles/globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="dark">
      <head />
      <body>
        <nav></nav>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
