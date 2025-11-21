import useTechnologies from "../hooks/useTechnologies.ts";
import {Link} from "react-router-dom";
import type {Technology} from "../App.tsx";

export function TechnologyListPage() {

  const {technologies} = useTechnologies()
  console.log(technologies)
  return (
    <div className="min-w-1/2 w-fit mx-auto min-h-full rounded-md p-2  flex flex-col items-center gap-2">
      <h2 className="text-gray-800 font-semibold text-xl">Список Технологий</h2>

      {technologies.map((tech: Technology) =>
          <div key={tech.id} className="technology-item w-2/3 m-1 p-1 shadow-md rounded-md hover:translate-x-1 flex flex-col items-center gap-2">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <div className="technology-meta">
            <span className={`status status-${tech.status}`}>
              {tech.status == 'in-progress' ? ('Изучается ⌛')
                : tech.status == 'completed' ? ('Изучен 📚')
                  : tech.status == 'not-started' ? ('Не изучается 🔴') : ''}
            </span>
              <Link to={`/technology/${tech.id}`} className="btn-link">
                Подробнее →
              </Link>
            </div>
          </div>
      )}

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