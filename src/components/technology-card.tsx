import type {Technology} from "../App.tsx";

export function TechnologyCard({changeStatus, handleDeleteTech ,technology}: {changeStatus: (id: string, status: string) => void , handleDeleteTech: (id: string)=> void, technology: Technology}) {
  const nextStatus = technology.status === 'completed'
    ? 'not-started'
    : technology.status == 'in-progress'
      ? 'completed'
      : technology.status == 'not-started'
        ? 'in-progress'
        : 'completed' ;

  const statusClass = technology.status === 'in-progress'
    ? 'bg-[color:var(--accent)] text-[color:var(--accent-foreground)] border-[color:var(--accent)]'
    : technology.status === 'completed'
      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-400'
      : 'bg-[color:color-mix(in_oklch,var(--destructive)_10%,transparent)] text-[color:var(--destructive)] border-[color:color-mix(in_oklch,var(--destructive)_60%,transparent)]';

  const statusLabel = technology.status === 'in-progress'
    ? 'Изучается ⏳'
    : technology.status === 'completed'
      ? 'Изучен 📚'
      : technology.status === 'not-started'
        ? 'Не изучается 🔴'
        : '';

  return (
    <article className="h-full flex flex-col rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--card-foreground)] shadow-sm hover:shadow-md transition-shadow">
      <header className="flex items-center justify-between rounded-t-xl border-b border-[color:var(--border)] bg-[color:color-mix(in_oklch,var(--secondary)_60%,transparent)] px-4 py-3">
        <h3 className="text-sm font-semibold truncate" title={technology.title}>
          {technology.title}
        </h3>
        <button
          className="inline-flex items-center justify-center h-7 w-7 rounded-full text-[color:var(--muted-foreground)] hover:bg-[color:var(--accent)] hover:text-[color:var(--foreground)] cursor-pointer"
          onClick={()=>handleDeleteTech(technology.id)}
        >
          ❌
        </button>
      </header>

      <section className="flex flex-1 flex-col justify-between gap-3 px-4 py-3">
        <p className="text-sm text-[color:var(--muted-foreground)] leading-snug line-clamp-4">
          {technology.description}
        </p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${statusClass}`}>
            {statusLabel}
          </span>
          <button
            className="inline-flex items-center rounded-md border border-[color:var(--primary)] bg-[color:var(--primary)] text-[color:var(--primary-foreground)] px-3 py-1 text-xs font-medium hover:bg-[color:color-mix(in_oklch,var(--primary)_90%,black_10%)]"
            onClick={()=>{changeStatus(technology.id, nextStatus)}}
          >
            Обновить статус
          </button>
        </div>
      </section>
    </article>
  )
}