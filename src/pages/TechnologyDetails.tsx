import {useParams} from "react-router-dom";

export function  TechnologyDetailPage(){

  const {techId} = useParams()
  return (
    <div>
      <h2>Описание технологии {techId}</h2>
    </div>
  )

}