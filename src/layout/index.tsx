interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <nav>Nav</nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}
