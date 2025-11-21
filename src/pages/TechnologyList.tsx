import useTechnologies from "../hooks/useTechnologies.ts";
import {Link} from "react-router-dom";
import type {Technology} from "../App.tsx";

export function TechnologyListPage() {

  const {technologies} = useTechnologies()
  console.log(technologies)
  return (
    <div className=" min-w-1/2 w-[60%] mx-auto  rounded-md p-2  flex flex-col gap-2">
      <div className="group ">
      <Link  to='/add-technology'>
        <span className=" group-hover:text-blue-500  ">+</span> Добавить технологию
      </Link>
      </div>
      <h2 className="text-gray-800 font-semibold text-xl">Список Технологий</h2>
      <div className="grid grid-cols-2 ">
      {technologies.map((tech: Technology) =>
          <div key={tech.id} className="technology-item  m-1 p-1 shadow-md rounded-md hover:translate-x-1 flex flex-col items-center gap-2">
            <h3 className="bg-emerald-200 px-2 py-1 rounded-md">{tech.title}</h3>
            <p>{tech.description}</p>
            <div className="technology-meta">
            <span className={`rounded  p-1 w-fit mr-6
            ${tech.status == 'in-progress' ? ' text-white bg-blue-600/70' :
                tech.status == "completed" ?  ' text-white bg-green-800/70' :
                  ' border-1 text-black  border-red-800/70'}`}
              >

              {tech.status == 'in-progress' ? ('Изучается ⌛')
                : tech.status == 'completed' ? ('Изучен 📚')
                  : tech.status == 'not-started' ? ('Не изучается 🔴') : ''}

            </span>
            <Link to={`/technology/${tech.id}`} className="">
              Подробнее →
            </Link>
            </div>
          </div>
      )}
      </div>

      {technologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="">
            Добавить первую технологию
          </Link>
        </div>
      )}

    </div>
  )
}