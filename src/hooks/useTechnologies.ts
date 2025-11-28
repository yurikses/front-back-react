import useLocalStorage from './useLocalStorage'
import type {Technology} from "../App.tsx";
import {v4 as uuidv4} from "uuid";

const initialTechnologies: Technology[] = [
  {
    id: uuidv4(),
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    previewSrc: '',
    notes: '',
    category: 'frontend',
    resources: ['http://test.url'],
  },
  {
    id: uuidv4(),
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    previewSrc: '',
    notes: '',
    category: 'backend',
    resources: ['http://test.url'],
  },
  {
    id: uuidv4(),
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    previewSrc: '',
    notes: '',
    category: 'backend',
    resources: ['http://test.url'],
  },
  {
    id: uuidv4(),
    title: 'Next.js Basics',
    description: 'Основы фреймворка Next.js',
    status: 'not-started',
    previewSrc: '',
    notes: '',
    category: 'backend',
    resources: ['http://test.url'],
  },
];

export type Category = {
  name: string;
}

const initialCategories: Category[] = [
  {name: 'backend'},
  {name: 'frontend'},
]



function useTechnologies(){
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);
  const [categories, setCategories] = useLocalStorage('categories', initialCategories)

  const updateStatus = (techId: string , newStatus: string)=>{
    setTechnologies((prev: Technology[]) =>
      prev.map((tech : Technology) =>
        tech.id === techId ? {...tech, status: newStatus} : tech
      )
    )
  }

  const updateNotes = (techId: string , newNotes: string) => {
    setTechnologies((prev: Technology[])=>
      prev.map((tech: Technology) =>
        tech.id === techId ? {...tech, notes: newNotes} : tech
      )
    )
  }

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter((tech: Technology) => tech.status ===
      'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };
  return {
    technologies,
    updateStatus,
    setTechnologies,
    updateNotes,
    progress: calculateProgress(),
    categories,
    setCategories,
  };

}
export default useTechnologies;
