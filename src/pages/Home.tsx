import {QuickActions} from "../components/quick-actions.tsx";
import {ProgressHeader} from "../components/progress-header.tsx";
import {TechnologyCard} from "../components/technology-card.tsx";
import type {Technology} from "../App.tsx";
import {useEffect, useState} from "react";
import useTechnologies from "../hooks/useTechnologies.ts";

export function HomePage(){
  const [searchText, setSearchText] = useState("");
  const { technologies, setTechnologies, updateStatus } = useTechnologies();

  const filteredTechs  = technologies.filter((tech: Technology) =>
    tech.title.toLowerCase().includes(searchText.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchText.toLowerCase()))

  useEffect(() => {
    if(technologies.length == 0){
      return;
    }
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    console.log('Данные сохранены в localStorage');
  }, [technologies]);

  function setAllComplete(){
    setTechnologies((prev: Technology[])=>
      prev.map((tech: Technology)=>
        tech.status != 'completed' ? {...tech, status: 'completed' } : tech
      )
    )
  }

  function resetAll(){
    setTechnologies((prev: Technology[])=>
      prev.map((tech: Technology)=>{
          return {...tech, status: 'not-started' }
        }
      )
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-6 pt-20 pb-10 flex flex-col gap-6">
      <section className="flex flex-col lg:flex-row lg:items-start gap-6">
        <QuickActions onAllComplete={setAllComplete} onResetAll={resetAll} technologies={technologies}/>
        <div className="flex-1">
          <ProgressHeader technologies={technologies} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-base font-medium text-gray-800">
            Поиск технологий
          </h2>
          <input
            className="w-full sm:max-w-xs rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            placeholder="Поиск технологий..."
            value={searchText}
            onChange={(e)=>{setSearchText(e.target.value)}}/>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTechs.map((technology: Technology ) => (
            <TechnologyCard  changeStatus = {updateStatus} key={technology.id} technology = {technology}/>
          ))}

          {filteredTechs.length === 0 && (
            <div className="col-span-full rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
              Нет технологий, подходящих под поиск.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}