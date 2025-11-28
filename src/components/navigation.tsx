import {Link, useLocation} from "react-router-dom";
import {useUser} from "@/hooks/useUser.tsx";
import {useTheme} from "@/hooks/useTheme.tsx";

export function Navigation(){
  const location = useLocation();
  const {user, isAuthorized} = useUser();
  const {theme, toggleTheme} = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full h-fit z-10 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between min-h-14 gap-3">
        <Link to="/" className="font-bold text-lg whitespace-nowrap">
          📝 Трекер технологий
        </Link>

        <nav className="flex items-center gap-4 flex-col sm:flex-row text-sm font-medium">
          {isAuthorized && (
            <span className="hover:opacity-75 pb-1">Здравствуйте, {user!.name}</span>
          )}

          <Link
            className={`nav-link-base ${isActive('/') ? 'nav-link-active' : 'nav-link-inactive'}`}
            to="/"
          >
            Главная
          </Link>
          <Link
            className={`nav-link-base ${isActive('/technologies') ? 'nav-link-active' : 'nav-link-inactive'}`}
            to="/technologies"
          >
            Все технологии
          </Link>
          <Link
            className={`nav-link-base ${isActive('/add-technology') ? 'nav-link-active' : 'nav-link-inactive'}`}
            to="/add-technology"
          >
            Добавить технологию
          </Link>
          <Link
            className={`nav-link-base ${isActive('/statistics') ? 'nav-link-active' : 'nav-link-inactive'}`}
            to="/statistics"
          >
            Статистика
          </Link>
          <Link
            className={`nav-link-base ${isActive('/settings') ? 'nav-link-active' : 'nav-link-inactive'}`}
            to="/settings"
          >
            Настройки
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="fixed top-0 right-10 min-h-14"
          >
            <span className="nav-theme-toggle-icon">
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
            <span className="hidden sm:inline">
              {theme === 'dark' ? 'Тёмная' : 'Светлая'} тема
            </span>
          </button>
        </nav>
      </div>
    </header>
  )

}