import type {Technology} from "../App.tsx";

export function TechnologyCard({changeStatus ,technology}: {changeStatus: (id: number, status: string) => void , technology: Technology}) {
  const nextStatus = technology.status === 'completed' ? 'not-started' : technology.status == 'in-progress' ? 'completed' : technology.status == 'not-started' ? 'in-progress' : 'completed' ;
  return (
    <div className="shadow-md rounded-md m-1 pb-2 min-w-[300px] ">
      <div className="text-center mb-2 bg-emerald-200 rounded-t-md  px-4">
        <h3>{technology.title}</h3>
      </div>

      <section className="flex justify-between gap-3  px-4">
        <div className="text-justify inline-flex flex-col gap-2">
          <p className="text-lg text-wrap">
            {technology.description}
          </p>
          <span className={`rounded  p-1 w-fit
        ${technology.status == 'in-progress' ? ' text-white bg-blue-600/70' :
            technology.status == "completed" ?  ' text-white bg-green-800/70' :
              ' border-1 text-black  border-red-800/70'}`}
          >

          {technology.status == 'in-progress' ? ('Изучается ⌛')
            : technology.status == 'completed' ? ('Изучен 📚')
              : technology.status == 'not-started' ? ('Не изучается 🔴') : ''}

        </span>
          <button className="w-fit px-2 py-1 bg-white border-1 rounded border-cyan-600" onClick={()=>{changeStatus(technology.id, nextStatus)}}>Обновить статус</button>
        </div>
        {/*<TechnologyNotes notes = {technology.notes} onNotesChange={onNoteChange} techId={technology.id} />*/}
      </section>



    </div>
  )
}