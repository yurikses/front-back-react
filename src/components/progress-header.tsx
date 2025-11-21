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

  const borderColor = percent < 50 ? 'border-red-400' : percent < 80 ? 'border-orange-400' : 'border-green-500';
  const barColor = percent < 50 ? 'bg-red-500' : percent < 80 ? 'bg-orange-400' : 'bg-green-600';

  return (
    <section className="rounded-lg border border-gray-200 bg-white/70 shadow-sm p-4 flex flex-col gap-3">
      <div className="space-y-1 text-sm text-gray-800">
        <p>Количество изученных технологий: <span className="font-semibold">{doneCount}</span> из {totalCount}</p>
        <p>Изучаются сейчас: <span className="font-semibold">{learningCount}</span> из {totalCount}</p>
        <p>Осталось изучить: <span className="font-semibold">{totalCount - doneCount - learningCount}</span> из {totalCount}</p>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm text-gray-700 whitespace-nowrap">
          Прогресс изучения:
        </p>
        <div className="flex-1">
          <div className={`w-full overflow-hidden rounded-md border text-xs text-center ${borderColor}`}>
            <div
              style={{ width: `${percent}%` }}
              className={`h-6 ${barColor} text-gray-50 flex items-center justify-center transition-all`}
            >
              {percent}%
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}