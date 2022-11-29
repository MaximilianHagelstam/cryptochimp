import ThemeSwitch from '../components/ThemeSwitch';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <nav>
        <ThemeSwitch />
      </nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}
