import type {PropsWithChildren} from "react";
import {useUser} from "@/hooks/useUser.tsx";
import {Link} from "react-router-dom";

export function AuthorizedOnly({children} : PropsWithChildren){
  const {isAuthorized} = useUser()
  console.log(isAuthorized)
  return(
    <>
      {isAuthorized ?
        (children)
      :
      (
        <div className="min-w-1/2 bg-white rounded shadow py-10 flex flex-col items-center gap-2">
          <h1 className="text-sm text-center">
            У вас нет доступа. <br/> Авторизуйтесь в приложении
          </h1>
          <Link to ='/auth' className='text-sm bg-cyan-500 text-white rounded py-1 px-2 '>
            Войти в приложение
          </Link>
        </div>

      )}
    </>
  )
}