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
  const percent: number = Math.floor(doneCount / totalCount*100);
  return (
    <div className="border border-gray-600/20 rounded shadow-md flex flex-col gap-3 p-2 m-4">
      <p className=''>Количество изученных технологий: {doneCount} из {totalCount}</p>
      <p className=''>Количество изучаемых технологий: {learningCount} из {totalCount}</p>
      <p className=''>Количество технологий требующих изучение: {totalCount - doneCount - learningCount } из {totalCount}</p>
      <div className="flex gap-2 w-full items-center">
        <p className='leading-1'>Процент изучения технологий: </p>
        <div  className="grow">
          <p  className={`flex-grow border 
        ${ percent <50
            ? `border-red-600` :
            percent < 80
              ? `border-orange-400`
              : `border-green-800`   } rounded-md m-1 p-1 text-center `}>
            <p
              style={{width: `${percent}%`}}
              className={`h-full rounded text-gray-100 
            ${ percent <50
                ? `bg-red-600` :
                percent < 80
                  ? `bg-orange-400` :
                  `bg-green-800`   }`}>{percent}%
            </p>
          </p>
        </div>
      </div>

    </div>
  )
}