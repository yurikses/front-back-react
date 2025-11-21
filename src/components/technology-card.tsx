import type {Technology} from "../App.tsx";

export function TechnologyCard({changeStatus ,technology}: {changeStatus: (id: number, status: string) => void , technology: Technology}) {
  const nextStatus = technology.status === 'completed'
    ? 'not-started'
    : technology.status == 'in-progress'
      ? 'completed'
      : technology.status == 'not-started'
        ? 'in-progress'
        : 'completed' ;

  const statusClass = technology.status === 'in-progress'
    ? 'text-blue-800 bg-blue-50 border border-blue-200'
    : technology.status === 'completed'
      ? 'text-green-800 bg-green-50 border border-green-200'
      : 'text-red-800 bg-red-50 border border-red-200';

  const statusLabel = technology.status === 'in-progress'
    ? 'Изучается ⏳'
    : technology.status === 'completed'
      ? 'Изучен 📚'
      : technology.status === 'not-started'
        ? 'Не изучается 🔴'
        : '';

  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
      <header className="px-4 py-3 border-b border-emerald-100 bg-emerald-50 rounded-t-xl">
        <h3 className="text-sm font-semibold text-gray-900 truncate" title={technology.title}>
          {technology.title}
        </h3>
      </header>

      <section className="flex flex-1 flex-col justify-between gap-3 px-4 py-3">
        <p className="text-sm text-gray-700 leading-snug line-clamp-4">
          {technology.description}
        </p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>
            {statusLabel}
          </span>
          <button
            className="inline-flex items-center rounded-md border border-cyan-500 px-3 py-1 text-xs font-medium text-cyan-700 bg-white hover:bg-cyan-50"
            onClick={()=>{changeStatus(technology.id, nextStatus)}}
          >
            Обновить статус
          </button>
        </div>
      </section>
    </article>
  )
}