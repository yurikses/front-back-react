import { type ChangeEvent, type FormEvent, type MouseEvent, useEffect, useRef, useState } from "react";
import useTechnologies, { type Category } from "../hooks/useTechnologies.ts";
import type { Technology } from "../App.tsx";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useImageSearch } from "../hooks/useImageSearch.ts";
import { CgCloseO } from "react-icons/cg";
import { type SyntheticEvent } from "react";
import {DropdownImagePicker} from "@/components/dropdown-image-picker.tsx";
import { IoAdd } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";

export function AddTechnologyPage() {
  const { setTechnologies, categories } = useTechnologies();
  const [selectedImage, setSelectedImage] = useState("");
  const { images, loading, searchImages } = useImageSearch(600);
  const navigate = useNavigate();
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  // Теперь каждый ресурс имеет уникальный id — это ключ к стабильности!
  const [resources, setResources] = useState<{ id: string; value: string }[]>([]);

  // Храним refs для каждого инпута
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Автофокус на последний добавленный инпут
  useEffect(() => {
    const last = resources[resources.length - 1];
    if (last) {
      inputRefs.current[last.id]?.focus();
    }
  }, [resources.length]);

  function AddTechnology(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("title") as string;
    const desc = formData.get("description") as string;
    const category = formData.get("category") as string;
    const previewSrc = selectedImage;
    const resouces = resources.map(r => r.value).filter(Boolean);

    setTechnologies((prev: Technology[]) => [
      ...prev,
      {
        id: uuidv4(),
        title: name,
        description: desc,
        notes: "",
        status: "not-started",
        category,
        previewSrc,
        resouces,
      },
    ]);

    alert("Технология добавлена!");
    navigate("/technologies");
  }

  const addNewResource = (e: MouseEvent) => {
    e.preventDefault();
    setResources(prev => [...prev, { id: uuidv4(), value: "" }]);
  };

  const handleChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    setResources(prev =>
      prev.map(item => (item.id === id ? { ...item, value: e.target.value } : item))
    );
  };

  const delResource = (id: string, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResources(prev => prev.filter(item => item.id !== id));
  };



  return (
    <main className="mx-auto min-w-[250px] w-2/3 px-6 pt-20 pb-10 ">
      <section className="rounded-xl border border-secondary dark:bg-neutral-900  px-6 py-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Добавить технологию
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); AddTechnology(e); }} className="flex">
          <div className="w-1/2">
            <div className="mb-3">
              <DropdownImagePicker previewHref={selectedImage} onOpenChange={()=>setIsImagePickerOpen(prevState => !prevState)} isOpen={isImagePickerOpen}>
                <div className="p-2 w-[300px] text-foreground ">
                  <p>Поиск картинки в интернете</p>
                  <input
                    onChange={(e) => { searchImages(e.target.value); }}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    type="text"
                    placeholder="Поиск картинки превью..."
                  />
                  <div className="">
                    {loading && <p>Поиск изображений...</p>}
                    {!loading && images.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-foreground mb-2">
                          Результаты поиска изображений:
                        </h3>
                        <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 rounded-md">
                          {images.map((imgSrc, index) => (
                            <img
                              key={index}
                              src={imgSrc.link}
                              onClick={() => setSelectedImage(imgSrc.link)}
                              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                                (e.target as HTMLElement).classList.add("hidden");
                              }}
                              alt={`Результат поиска ${index + 1}`}
                              className="w-full h-auto rounded-md cursor-pointer hover:scale-105"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </DropdownImagePicker>
            </div>

            <div className="flex flex-col gap-3">
              <input
                required
                name="title"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="text"
                placeholder="Название технологии..."
              />
              <input
                required
                name="description"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="text"
                placeholder="Описание технологии..."
              />

              <label className="flex flex-col gap-1 text-sm text-gray-800 dark:text-gray-200">
                <span>Категория</span>
                <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Категории</SelectLabel>

                    {categories.map((category: Category) => (
                      <SelectItem key={crypto.randomUUID()} value={category.name}>{category.name}</SelectItem>
                    ))}

                  </SelectGroup>
                </SelectContent>
              </Select>

              </label>
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Добавить технологию
                </button>
              </div>
            </div>
          </div>

          {/* Правая колонка — ресурсы (стили 1 в 1 как у тебя были) */}
          <div className="w-1/2 ml-3">
            <div className="flex gap-3 items-center mb-1">
              <p className="font-semibold">Список ресурсов </p>
              <button className="hover:text-foreground text-lg p-1 hover:bg-black/20 dark:hover:bg-white/20 rounded-full" onClick={addNewResource}>
                <IoAdd />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {resources.map((resource) => (
                <div
                  key={resource.id} // ← стабильный ключ — фокус не теряется!
                  className="flex gap-3 bg-gray-200/60 dark:bg-neutral-800 justify-between p-2 rounded-md"
                >
                  <input
                    /* @ts-expect-error fix ref */
                    ref={(el) => inputRefs.current[resource.id] = el}
                    name="resources[]"
                    required
                    className="bg-transparent focus:outline-0 focus:bg-transparent active:bg-transparent flex-1"
                    onChange={(e) => handleChange(resource.id, e)}
                    value={resource.value}
                    placeholder="https://..."
                  />
                  <button className="group" onClick={(e) => delResource(resource.id, e)}>
                    <CgCloseO className="group-hover:text-red-600" />
                  </button>
                </div>
              ))}
              {resources.length == 0 && (
                <div>
                  <p className="bg-gray-200 dark:bg-neutral-800 p-2 text-center font-semibold text-sm rounded-md">Ресурсов пока нет. <br/> Добавьте новый.</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
// }
// import {type ChangeEvent, type FormEvent, type SyntheticEvent, useEffect, useState} from "react";
// import useTechnologies, {type Category} from "../hooks/useTechnologies.ts";
// import type {Technology} from "../App.tsx";
// import {useNavigate} from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
// import {useImageSearch} from "../hooks/useImageSearch.ts";
// import { CgCloseO } from "react-icons/cg";
// import {type MouseEvent} from "react" ;
//
// export function AddTechnologyPage(){
//   const {setTechnologies, categories} = useTechnologies()
//   const [selectedImage, setSelectedImage] = useState('')
//   const { images, loading, searchImages } = useImageSearch(600);
//   const navigate = useNavigate()
//   const [resources, setResources] = useState<string[]>(['http://localhost:8000', 'http://localhost:8000']);
//   const [focusedInput, setFocusedInput] = useState<HTMLInputElement>()
//
//   function AddTechnology(e: FormEvent){
//     console.log("Добавляем технологию");
//     const form = e.target as HTMLFormElement
//     const formData = new FormData(form)
//     const name = formData.get("title") as string
//     const desc = formData.get("description") as string
//     const category = formData.get("category") as string
//     const previewSrc = selectedImage
//     const resouces = formData.getAll('resources[]') as string[]
//
//     setTechnologies((prev: Technology[])=>
//       [...prev, {id: uuidv4() , title: name, description: desc, notes:'', status: 'not-started', category: category , previewSrc: previewSrc, resouces: resouces }]
//     )
//
//     alert("Технология добавлена!")
//     navigate('/technologies')
//   }
//
//   const addNewResource = (e: MouseEvent) =>{
//     e.preventDefault()
//     setResources(prevState => [...prevState, ''])
//   }
//
//   const handleChange = (e: ChangeEvent, index: number) => {
//      e.preventDefault()
//     setResources(prevState => prevState.map((item: string, key: number)=>{
//       if(index == key ){
//         return (e.target as HTMLInputElement ).value
//       }
//       return item
//     }))
//   }
//   const handleFocus = (e: MouseEvent)=>{
//     const eventInput = e.target as HTMLInputElement;
//     console.log(eventInput)
//     if(focusedInput === eventInput ) {
//       console.log('focus')
//       setFocusedInput(e.target as HTMLInputElement)
//     }
//
//   }
//   const delResource = (resIndex: number, e: MouseEvent)=>{
//     e.preventDefault()
//     e.stopPropagation()
//     setResources(prevState => prevState.filter((_item: string, index: number) => index != resIndex))
//   }
//
//   useEffect(() => {
//     if(focusedInput){
//       focusedInput.focus()
//     }
//   }, [resources, focusedInput]);
//   return(
//     <main className="mx-auto min-w-[250px] w-2/3 px-6 pt-20 pb-10">
//       <section className="rounded-xl border border-gray-200 bg-white/80 px-6 py-6 shadow-sm">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">
//           Добавить технологию
//         </h2>
//         <form onSubmit={(e)=>{e.preventDefault(); AddTechnology(e)}} className='flex'>
//           <div className='w-1/2'>
//             <div>
//
//               {selectedImage !== '' ? (
//                   <>
//                     <h2>Превью технологии </h2>
//                     <div className="w-full my-2 rounded shadow-sm bg-gray-100">
//                       <img src={selectedImage} alt="" className="h-[180px] w-auto mx-auto"/>
//                     </div>
//                   </>
//                 ):
//                 (<div>
//
//                 </div>)}
//             </div>
//             <div
//
//               className="flex flex-col gap-3"
//             >
//               <input
//                 required
//                 name="title"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 type="text"
//                 placeholder="Название технологии..."
//               />
//               <input
//                 required
//                 name="description"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 type="text"
//                 placeholder="Описание технологии..."
//               />
//               <label className="flex flex-col gap-1 text-sm text-gray-800">
//                 <span>Категория</span>
//
//                 <select
//                   className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   defaultValue='frontend'
//                   name="category"
//                   id=""
//                 >
//                   {categories.map((category: Category) => (
//                     <option key={crypto.randomUUID()} value={category.name}>{category.name}</option>
//                   ))}
//                 </select>
//               </label>
//               <div>
//                 {loading && <p>Поиск изображений...</p>}
//                 {!loading && images.length > 0 && (
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-900 mb-2">Результаты поиска изображений:</h3>
//                     <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 rounded-md">
//                       {images.map((imgSrc, index) => (
//                         <img key={index} src={imgSrc.link} onClick={()=>setSelectedImage(imgSrc.link)} onError={(e: SyntheticEvent<HTMLImageElement>)=>{const target = e.target  as HTMLElement; target.classList.add('hidden')}} alt={`Результат поиска ${index + 1}`} className="w-full h-auto rounded-md cursor-pointer hover:scale-105 " />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//
//               <p>Выберите картинку для превью...</p>
//               <input
//                 onChange={(e)=>{searchImages(e.target.value)}}
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 type="text"
//                 placeholder="Поиск картинки превью..."
//               />
//               <div className="mt-2 flex justify-end">
//                 <button
//                   type="submit"
//                   className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                 >
//                   Добавить технологию
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="w-1/2 ml-3">
//             <div className='flex gap-3 items-center mb-1'>
//               <p className='font-semibold'>Список ресурсов </p>
//               <button className="hover:text-gray-800/65 text-lg " onClick={addNewResource}>+</button>
//             </div>
//             <div className='flex flex-col gap-2'>
//               {resources.map((resource: string, key: number)=>(
//                 <div key={crypto.randomUUID()} className='flex gap-3 bg-gray-200/60 justify-between p-2 rounded-md'>
//                   {/*// @ts-expect-error fig ego znaet*/}
//                   <input key={key} onFocus={handleFocus}  name='resources[]' className='bg-transparent focus:outline-0 focus:bg-transparent active:bg-transparent' onChange={(e)=>handleChange(e,key)} value={resource}></input>
//                   <button  className=" group" onClick={(e: MouseEvent)=>delResource(key, e)}> <CgCloseO onClick={(e)=> e.preventDefault()} className='group-hover:text-red-600'/> </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </form>
//
//
//       </section>
//     </main>
//   )
// }