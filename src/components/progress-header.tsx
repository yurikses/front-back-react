export function ProgressHeader({technologies}: {technologies: {id:number , title: string, description: string, status: string }[]}) {
  const totalCount = technologies.length
  let doneCount = 0
  let learningCount = 0
  technologies.forEach(technology => {
    if (technology.status === 'completed') {
      doneCount++
    }
    if(technology.status === 'in-progress') {
      learningCount++
    }
  })
  const percent: number = totalCount === 0 ? 0 : Math.floor(doneCount / totalCount*100);

  const borderClass = percent < 50 ? 'border-[color:color-mix(in_oklch,var(--destructive)_70%,transparent)]' : percent < 80 ? 'border-amber-400' : 'border-emerald-500';
  const fillClass = percent <= 5 ? 'bg-[color:var(--muted)]' : percent < 50 ? 'bg-[color:var(--muted)]' : percent < 80 ? 'bg-amber-400' : 'bg-emerald-600';
  const textClass = percent > 5 ? 'text-[color:var(--background)]' : 'text-[color:var(--foreground)]';

  return (
    <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--card)]/70 shadow-sm p-4 flex flex-col gap-3">
      <div className="space-y-1 text-sm text-[color:var(--foreground)]">
        <p>Количество изученных технологий: <span className="font-semibold">{doneCount}</span> из {totalCount}</p>
        <p>Изучаются сейчас: <span className="font-semibold">{learningCount}</span> из {totalCount}</p>
        <p>Осталось изучить: <span className="font-semibold">{totalCount - doneCount - learningCount}</span> из {totalCount}</p>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm text-[color:var(--muted-foreground)] whitespace-nowrap">
          Прогресс изучения:
        </p>
        <div className="flex-1">
          <div className={`w-full overflow-hidden rounded-md border text-xs text-center text-foreground ${borderClass}`}>
            <div
              style={percent > 5 ? { width: `${percent}%` } : {}}
              className={`h-6 flex items-center justify-center transition-all text-gray-200 ${fillClass} ${textClass}`}
            >
              {percent}%
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}