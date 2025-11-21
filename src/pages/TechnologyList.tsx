import useTechnologies from "../hooks/useTechnologies.ts";
import {Link} from "react-router-dom";
import type {Technology} from "../App.tsx";

export function TechnologyListPage() {

  const {technologies} = useTechnologies()
  console.log(technologies)
  return (
    <main className="mx-auto max-w-5xl px-6 pt-20 pb-10 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-900">
          Список технологий
        </h2>
        <Link
          to='/add-technology'
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <span className="mr-1 text-base">+</span> Добавить технологию
        </Link>
      </header>

      {technologies.length === 0 ? (
        <section className="mt-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-600">
          <p className="mb-3">Технологий пока нет.</p>
          <Link
            to="/add-technology"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Добавить первую технологию
          </Link>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2">
          {technologies.map((tech: Technology) => (
            <div
              key={tech.id}
              className="group rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-gray-900">{tech.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-[11px]
                  ${tech.status == 'in-progress' ? 'text-blue-800 bg-blue-50 border border-blue-200' :
                    tech.status == "completed" ?  'text-green-800 bg-green-50 border border-green-200' :
                      'text-red-800 bg-red-50 border border-red-200'}`}
                >
                  {tech.status == 'in-progress' ? ('Изучается ⏳')
                    : tech.status == 'completed' ? ('Изучен 📚')
                      : tech.status == 'not-started' ? ('Не изучается 🔴') : ''}
                </span>
              </div>

              <p className="text-sm text-gray-700 line-clamp-3">
                {tech.description}
              </p>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-xs uppercase tracking-wide text-gray-400">
                  Категория: {tech.category}
                </span>
                <Link to={`/technology/${tech.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Подробнее →
                </Link>
              </div>
            </div>
          ))}
        </section>
      )}

    </main>
  )
}