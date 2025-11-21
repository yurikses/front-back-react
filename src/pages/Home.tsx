import {QuickActions} from "../components/quick-actions.tsx";
import {ProgressHeader} from "../components/progress-header.tsx";
import {TechnologyCard} from "../components/technology-card.tsx";
import type {Technology} from "../App.tsx";
import {useEffect, useState} from "react";
import useTechnologies from "../hooks/useTechnologies.ts";

export function HomePage(){
  const [searchText, setSearchText] = useState("");
  const { technologies, setTechnologies, updateStatus, updateNotes } = useTechnologies();


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
    <div className="px-12">
      <QuickActions onAllComplete={setAllComplete} onResetAll={resetAll} technologies={technologies}/>
      <div className="flex w-fit gap-4 mx-auto my-3">
        <h2>Поиск технологий: </h2>
        <input
          className=" rounded-md border-2 px-1 leading-2border-gray-500 focus:border-gray-700 focus:outline-0"
          type="text"
          placeholder="Поиск технологий..."
          value={searchText}
          onChange={(e)=>{setSearchText(e.target.value)}}/>
      </div>

      <div className="grid grid-cols-4">
        {filteredTechs.map((technology: Technology ) =>
          ( <TechnologyCard  changeStatus = {updateStatus} key={technology.id} technology = {technology}/>))}
      </div>

    </div>
  )
}