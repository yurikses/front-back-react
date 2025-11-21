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
    <div className="App">

      <h1 className="text-xl text-center m-3">Моё React приложение</h1>
      <div className="flex w-fit gap-4 mx-auto">
        <h2>Поиск: </h2>
        <input
          className=" rounded-md border border-gray-500 focus:active:border-gray-700 focus:active:outline-0"
          type="text"
          placeholder="Поиск технологий..."
          value={searchText}
          onChange={(e)=>{setSearchText(e.target.value)}}/>
      </div>
      <QuickActions onAllComplete={setAllComplete} onResetAll={resetAll} technologies={technologies}/>
      <ProgressHeader technologies = {filteredTechs}/>
      <div className="flex flex-col gap-3">
        {filteredTechs.map((technology: Technology ) =>
          ( <TechnologyCard onNoteChange={updateNotes} changeStatus = {updateStatus} key={technology.id} technology = {technology}/>))}
      </div>

    </div>
  )
}