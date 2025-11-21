import useLocalStorage from './useLocalStorage'
import type {Technology} from "../App.tsx";

const initialTechnologies: Technology[] = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  {
    id: 3,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  {
    id: 4,
    title: 'Next.js Basics',
    description: 'Основы фреймворка Next.js',
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
];

function useTechnologies(){
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  const updateStatus = (techId: number , newStatus: string)=>{
    setTechnologies((prev: Technology[]) =>
      prev.map((tech : Technology) =>
        tech.id === techId ? {...tech, status: newStatus} : tech
      )
    )
  }

  const updateNotes = (techId: number , newNotes: string) => {
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
    progress: calculateProgress()
  };

}
export default useTechnologies;
