import {Link, useParams} from "react-router-dom";
import useTechnologies from "../hooks/useTechnologies.ts";
import type {Technology} from "../App.tsx";
import {TechnologyNotes} from "../components/techology-notes.tsx";

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
    ? 'text-blue-800 bg-blue-50 border border-blue-200'
    : technology.status === 'completed'
      ? 'text-green-800 bg-green-50 border border-green-200'
      : 'text-red-800 bg-red-50 border border-red-200';

  const statusLabel = technology.status === 'in-progress'
    ? 'Изучается ⏳'
    : technology.status === 'completed'
      ? 'Изучен 📚'
      : 'Не изучается 🔴';

  return (
    <main className="mx-auto max-w-5xl px-6 pt-20 pb-10 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <Link to="/technologies" className="text-sm text-blue-600 hover:text-blue-700">
          &larr; Вернуться к списку
        </Link>
      </div>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
        <div className="rounded-lg border border-gray-200 bg-white/80 p-4 shadow-sm flex flex-col gap-4">
          <header className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Технология</p>
              <h1 className="text-xl font-semibold text-gray-900 break-words">{technology.title}</h1>
            </div>
            <span className={`h-fit rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>
              {statusLabel}
            </span>
          </header>

          <div className="space-y-2 text-sm text-gray-800">
            <p className="font-medium text-gray-700">Описание</p>
            <p className="leading-snug whitespace-pre-wrap">{technology.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              Категория: <span className="font-medium">{technology.category}</span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Управление статусом</h3>
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

        <TechnologyNotes onNotesChange={updateNotes} notes={technology.notes} techId={technology.id}/>
      </section>

    </main>
  )

}