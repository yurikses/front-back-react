import useTechnologies from "../hooks/useTechnologies.ts";
import {Link} from "react-router-dom";
import type {Technology} from "../App.tsx";

export function TechnologyListPage() {
  const {technologies} = useTechnologies()



  return (
    <main className="mx-auto max-w-5xl px-6 pt-20 pb-10 flex flex-col gap-4 bg-[color:var(--background)] text-[color:var(--foreground)]">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">
          Список технологий
        </h2>
        <Link
          to='/add-technology'
          className="inline-flex items-center rounded-md bg-[color:var(--primary)] px-3 py-1.5 text-sm font-medium text-[color:var(--primary-foreground)] hover:bg-[color:color-mix(in_oklch,var(--primary)_90%,black_10%)]"
        >
          <span className="mr-1 text-base">+</span> Добавить технологию
        </Link>
      </header>

      {technologies.length === 0 ? (
        <section className="mt-4 rounded-lg border border-dashed border-[color:var(--border)] bg-[color:var(--muted)] px-6 py-10 text-center text-sm text-[color:var(--muted-foreground)]">
          <p className="mb-3">Технологий пока нет.</p>
          <Link
            to="/add-technology"
            className="inline-flex items-center rounded-md bg-[color:var(--primary)] px-3 py-1.5 text-sm font-medium text-[color:var(--primary-foreground)] hover:bg-[color:color-mix(in_oklch,var(--primary)_90%,black_10%)]"
          >
            Добавить первую технологию
          </Link>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2">
          {technologies.map((tech: Technology) => (
            <div
              key={tech.id}
              className="group rounded-xl border border-[color:var(--border)] bg-[color:var(--card)]/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
            >
              <div className="w-full h-fit bg-[color:var(--muted)] rounded-md overflow-hidden flex items-center justify-center">
                {tech.previewSrc != '' ? (
                  <img className="h-[120px] w-auto mx-auto object-contain"
                       src={tech.previewSrc}
                       alt="превью технологии"/>
                ) : (
                  <img className="h-[120px] w-auto mx-auto object-contain"
                       src={`src/assets/no_image.jpg`}
                       alt="превью технологии"/>
                )}
              </div>

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold">
                  {tech.title}
                </h3>
                <span
                  className={` inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                    tech.status === 'in-progress'
                    ? 'bg-[color:var(--accent)] text-[color:var(--accent-foreground)] border-[color:var(--accent)]'
                    : tech.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-400'
                    : 'bg-[color:color-mix(in_oklch,var(--destructive)_10%,transparent)] text-[color:var(--destructive)] border-[color:color-mix(in_oklch,var(--destructive)_60%,transparent)]'
                  }`}>

                  {tech.status == 'in-progress' ? ('Изучается ⏳')
                    : tech.status == 'completed' ? ('Изучен 📚')
                      : tech.status == 'not-started' ? ('Не изучается 🔴') : ''}
                </span>
              </div>

              <p className="text-sm text-[color:var(--muted-foreground)] line-clamp-3">
                {tech.description}
              </p>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                  Категория: {tech.category}
                </span>
                <Link
                  to={`/technology/${tech.id}`}
                  className="text-sm font-medium text-[color:var(--primary)] hover:text-[color:color-mix(in_oklch,var(--primary)_90%,black_10%)]"
                >
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