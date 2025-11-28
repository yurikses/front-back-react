import {ProgressHeader} from "../components/progress-header.tsx";
import useTechnologies from "../hooks/useTechnologies.ts";

export function StatisticsPage(){
  const {technologies} = useTechnologies()
  return (
    <div className="min-w-1/2 w-fit mx-auto pt-16">
      <h1 className="text-foreground text-center text-lg font-semibold">Статистика пользователя</h1>
      <ProgressHeader technologies = {technologies}/>
    </div>
  )
}