import {Link, useLocation} from "react-router-dom";

export function Navigation(){
  const location = useLocation();

  return (
    <div className='flex justify-between items-center w-full h-fit p-2'>
      <div className="">
        <Link to="/">
          📟 Трекер технологий
        </Link>
      </div>
      <Link className={`${location.pathname === '/' ? '' : ''}`} to="/">
        Главная
      </Link>
      <Link className={`${location.pathname === '/technologies' ? '' : ''}`} to="/technologies">
        Все технологии
      </Link>
      <Link className={`${location.pathname === '/add-technology' ? '' : ''}`} to="/add-technology">
        Добавить технологию
      </Link>
    </div>
  )

}