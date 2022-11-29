import { useTheme } from '../../hooks/useTheme';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn-circle btn" onClick={toggleTheme}>
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
}
