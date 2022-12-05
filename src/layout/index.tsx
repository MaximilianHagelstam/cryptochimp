interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav>nav</nav>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

export default Layout;
