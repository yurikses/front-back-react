import {Link, useParams} from "react-router-dom";
import useTechnologies from "../hooks/useTechnologies.ts";
import type {Technology} from "../App.tsx";
import {TechnologyNotes} from "../components/techology-notes.tsx";
import preview from '../assets/no_image.jpg';
import {createFullUrl} from "@/lib/utils.ts";

export function  TechnologyDetailPage(){
  const {technologies, setTechnologies, updateNotes} = useTechnologies()
  const {techId} = useParams()
  const technology = technologies.find((technology: Technology) => technology.id.toString() === techId)
  function handleTechnologyStatusChange(newStatus: string){
    setTechnologies((prev: Technology[])=>{
      return prev.map((tech: Technology)=>
        tech.id === technology.id ? {...tech, status: newStatus}: tech
      )
    })
  }


  if (!technology) {
    return (
      <main className="mx-auto max-w-3xl px-6 pt-20 pb-10">
        <Link to="/technologies" className="text-sm text-blue-600 hover:text-blue-700">
          &larr; Вернуться к списку
        </Link>
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Технология не найдена.
        </div>
      </main>
    );
  }

  const statusClass = technology.status === 'in-progress'
    ? 'bg-[color:var(--accent)] text-[color:var(--accent-foreground)] border-[color:var(--accent)]'
    : technology.status === 'completed'
      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-400'
      : 'bg-[color:color-mix(in_oklch,var(--destructive)_10%,transparent)] text-[color:var(--destructive)] border-[color:color-mix(in_oklch,var(--destructive)_60%,transparent)]';


  const statusLabel = technology.status === 'in-progress'
    ? 'Изучается ⏳'
    : technology.status === 'completed'
      ? 'Изучен 📚'
      : 'Не изучается 🔴';

  return (
    <main className="mx-auto max-w-5xl px-6 pt-20 pb-10 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <Link to="/technologies" className="text-sm text-blue hover:text-blue-300">
          &larr; Вернуться к списку
        </Link>
      </div>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
        <div className="rounded-lg border border-gray-200 bg-muted text-foreground p-4 shadow-sm flex flex-col gap-4">
          <div className="w-full h-fit bg-gray-100 rounded-t-sm">
            {technology.previewSrc.length > 0 ? (
                <img className="h-[160px] w-auto mx-auto" onError={()=>{console.log('Ошибка загрузки изображения')}} src={technology.previewSrc} alt="превью технологии"/>
            ) :
            (
              <img className="h-[160px] w-auto mx-auto" src={preview} alt="превью технологии"/>
            )}
          </div>


          <header className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase text-foreground mb-1">Технология</p>
              <h1 className="text-xl font-semibold text-foreground break-words">{technology.title}</h1>
            </div>
            <span className={`h-fit rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>
              {statusLabel}
            </span>
          </header>

          <div className="space-y-2 text-sm text-foreground">
            <p className="font-medium text-gray-700 dark:text-gray-200">Описание</p>
            <p className="leading-snug whitespace-pre-wrap">{technology.description}</p>
            <p className="text-xs text-gray-500 dark:text-neutral-200 mt-2">
              Категория: <span className="font-medium">{technology.category}</span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-neutral-100">Управление статусом</h3>
            <div className="flex flex-wrap gap-2 text-sm text-white">
              <button
                onClick={()=>{handleTechnologyStatusChange('not-started')}}
                className="rounded-md bg-red-600 px-3 py-1.5 hover:bg-red-700"
              >
                Не изучается
              </button>
              <button
                onClick={()=>{handleTechnologyStatusChange('in-progress')}}
                className="rounded-md bg-orange-600 px-3 py-1.5 hover:bg-orange-700"
              >
                Изучается
              </button>
              <button
                onClick={()=>{handleTechnologyStatusChange('completed')}}
                className="rounded-md bg-green-600 px-3 py-1.5 hover:bg-green-700"
              >
                Изучен
              </button>
            </div>
          </div>
        </div>


        <div>
          <TechnologyNotes onNotesChange={updateNotes} notes={technology.notes} techId={technology.id}/>
          <div className="flex flex-col gap-2 p-4 rounded-lg border border-gray-200 bg-muted mt-4 text-sm font-semibold">
            <p >Список ресурсов</p>
            <div className='flex flex-col gap-2  '>
              {technology.resouces && technology.resouces.length > 0 ? (
                (<>
                  {technology.resouces.map((resource: string)=>(
                    <a className='bg-gray-200 rounded-md py-1 px-4 w-fit hover:bg-blue-400 hover:text-white' href={createFullUrl(resource)}>{resource}</a>
                  ))}
                </>)
              ) :
                (<p className='bg-primary/25 dark:bg-black/95 p-2 text-center rounded-md'>
                  Ресурсов нет
                </p>)}

            </div>
          </div>
        </div>
      </section>

    </main>
  )

}