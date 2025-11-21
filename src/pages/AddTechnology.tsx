import {useRef} from "react";
import useTechnologies from "../hooks/useTechnologies.ts";
import type {Technology} from "../App.tsx";

export function AddTechnologyPage(){
  const {setTechnologies} = useTechnologies()
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(undefined);
  function AddTechnology(){
    console.log("Добавляем технологию");
    if(nameRef.current && descRef.current && categoryRef.current){
      const name = nameRef.current.value;
      const desc = descRef.current.value;
      const category = categoryRef.current.value;
      setTechnologies((prev: Technology[])=>
        [...prev, {id: prev.length+1, title: name, description: desc, notes:'', status: 'not-started', category: category  }]
      )
    }
    alert("Технология добавлена!")
    location.href = '/'
  }
  
  return(
    <div className="min-w-1/2 w-fit mx-auto min-h-full rounded-md p-2 flex flex-col items-center gap-2">
      <h2 className="text-gray-800 font-semibold text-xl">Добавить технологию:</h2>
      <form  onSubmit={(e)=>{e.preventDefault(); AddTechnology()}} className="flex flex-col items-center gap-2 shadow-md  px-8  rounded w-full py-6">
        <input required className="w-full border-2 border-orange-600/60 rounded-md p-1  focus:border-amber-800 focus:outline-0" type="text" ref = {nameRef} placeholder="Название технологии..."/>
        <input required  className=" w-full border-2 border-orange-600/60 rounded-md p-1  focus:border-amber-800 focus:outline-0" type="text" ref={descRef} placeholder="Описание технологии..."/>
        <label className="flex items-center gap-2">
          <span>Категория: </span>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-expect-error*/}
          <select className=" rounded-md p-1  focus:outline-0 " defaultValue='frontend' name="Категория" id="" ref={categoryRef}>
            <option className="outline-0" value="frontend">Фронтэнд</option>
            <option className="outline-0" value="backend">Бэкэнд</option>
          </select>
        </label>
        <button type="submit">Добавить технологию</button>
      </form>
    </div>
  )
}