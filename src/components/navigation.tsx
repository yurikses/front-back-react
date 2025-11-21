import {Link, useLocation} from "react-router-dom";

export function Navigation(){
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-14">
        <Link to="/" className="font-bold text-lg text-gray-900 whitespace-nowrap">
          📝 Трекер технологий
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            className={`${location.pathname === '/' ? 'text-gray-900 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-900'} pb-0.5`}
            to="/"
          >
            Главная
          </Link>
          <Link
            className={`${location.pathname === '/technologies' ? 'text-gray-900 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-900'} pb-0.5`}
            to="/technologies"
          >
            Все технологии
          </Link>
          <Link
            className={`${location.pathname === '/add-technology' ? 'text-gray-900 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-900'} pb-0.5`}
            to="/add-technology"
          >
            Добавить технологию
          </Link>
          <Link
            className={`${location.pathname === '/statistics' ? 'text-gray-900 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-900'} pb-0.5`}
            to="/statistics"
          >
            Статистика
          </Link>
        </nav>
      </div>
    </header>
  )

}