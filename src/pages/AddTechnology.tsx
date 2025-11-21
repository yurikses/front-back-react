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
    <main className="mx-auto max-w-xl px-6 pt-20 pb-10">
      <section className="rounded-xl border border-gray-200 bg-white/80 px-6 py-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Добавить технологию
        </h2>
        <form
          onSubmit={(e)=>{e.preventDefault(); AddTechnology()}}
          className="flex flex-col gap-3"
        >
          <input
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            ref = {nameRef}
            placeholder="Название технологии..."
          />
          <input
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            ref={descRef}
            placeholder="Описание технологии..."
          />
          <label className="flex flex-col gap-1 text-sm text-gray-800">
            <span>Категория</span>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-expect-error*/}
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue='frontend'
              name="Категория"
              id=""
              ref={categoryRef}
            >
              <option className="outline-0" value="frontend">Фронтенд</option>
              <option className="outline-0" value="backend">Бэкенд</option>
            </select>
          </label>
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Добавить технологию
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}