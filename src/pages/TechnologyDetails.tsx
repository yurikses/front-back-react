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

  return (
    <div className="min-w-1/2 w-fit mx-auto shadow-md p-2">
      <div className="hover:translate-x-1 mb-4" >
        <Link to="/technologies">
          &larr; Вернуться к списку
        </Link>
      </div>
      <div className="w-full mx-auto">
        <div className="w-full flex gap-2">
          <div className="flex flex-col ">
            <span className="">Технология: </span>
            <span>Описание: </span>
            <span className="py-1">Статус: </span>
          </div>
          <div className="flex flex-col ">
            <span>{technology.title}</span>
            <p>
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
          </div>
        </div>
        <div>
          <h3>Управление статусом: </h3>
          <div className="flex text-white gap-2">
            <button onClick={()=>{handleTechnologyStatusChange('not-started')}} className="bg-red-600 px-2 py-1 rounded hover:bg-red-700">Не изучается</button>
            <button onClick={()=>{handleTechnologyStatusChange('in-progress')}} className="bg-orange-600 px-2 py-1 rounded hover:bg-orange-700">Изучается</button>
            <button onClick={()=>{handleTechnologyStatusChange('completed')}} className="bg-green-600 px-2 py-1 rounded hover:bg-green-700">Изучен</button>
          </div>
        </div>

        <TechnologyNotes onNotesChange={updateNotes} notes={technology.notes} techId={technology.id}/>
      </div>

    </div>
  )

}