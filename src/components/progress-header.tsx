export function ProgressHeader({technologies}: {technologies: {id:number , title: string, description: string, status: string }[]}) {

  const totalCount = technologies.length;
  let doneCount = 0;
  technologies.forEach(technology => {
    if (technology.status === 'completed') {
      doneCount++;
    }
  })
  const percent: number = Math.floor(doneCount / totalCount*100);
  return (
    <div className="border border-gray-600/20 rounded shadow-md flex flex-col gap-3 p-2 m-4">
      <p className=''>Количество технологий: {totalCount}</p>
      <p className=''>Количестов изученных технологий: {doneCount}</p>
      <p className=''>Проценты выполнения: </p>
      <div className="flex flex-col gap-2">
        <div  className="flex gap-2 ">
          <span className="w-[20%] text-end"></span>
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