import {Link, useLocation} from "react-router-dom";

export function Navigation(){
  const location = useLocation();

  return (
    <div className='flex justify-evenly items-center w-full h-fit p-2 bg-gray-200/70 backdrop-blur-lg px-10 fixed top-0 left-0'>
      <div className="font-bold flex-3 text-2xl">
        <Link to="/">
          📟 Трекер технологий
        </Link>
      </div>
      <Link className={`${location.pathname === '/' ? ' text-black ' : 'text-gray-800 '} flex-2 font-semibold text-sm`} to="/">
        Главная
      </Link>
      <Link className={`${location.pathname === '/technologies' ? ' text-black ' : 'text-gray-800 '} flex-2 font-semibold text-sm`} to="/technologies">
        Все технологии
      </Link>
      <Link className={`${location.pathname === '/add-technology' ? ' text-black ' : 'text-gray-800 '} flex-2 font-semibold text-sm`} to="/add-technology">
        Добавить технологию
      </Link>
      <Link className={`${location.pathname === '/statistics' ? ' text-black ' : 'text-gray-800 '} flex-2 font-semibold text-sm`} to="/statistics">
        Статистика
      </Link>
    </div>
  )

}