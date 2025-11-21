
export function AddTechnologyPage(){

  return(
    <div>
      <h2>Добавить технологию:</h2>
      <div>
        <label >
          <input type="text" placeholder="Название технологии..."/>
        </label>
        <label >
          <input type="text" placeholder="Описание технологии..."/>
        </label>
        <label >
          <select name="Категория" id="">
            <option value="frontend">Фронтэнд</option>
            <option value="backend">Бэкэнд</option>
          </select>
        </label>

      </div>
    </div>
  )
}