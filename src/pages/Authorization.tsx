import { useUser} from "@/hooks/useUser.tsx";
import type {FormEvent} from "react";

export function AuthorizationPage() {
  const { login } = useUser()
  function authWithData(name: string, password: string) {
    const isOk = login(name, password)
    if(isOk){
      location.href = '/'
    }
  }

  const onSubmitAuth = (e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement )
    const name = formData.get("name") as string
    const password = formData.get("password") as string
    authWithData(name, password)
  }
  return (
    <div className="min-w-1/3 w-fit mx-auto mt-16">
      <h1 className=" text-center p-1">Авторизация</h1>
      <div className="rounded-xl border border-gray-200 bg-white/80 px-6 py-6 shadow-sm ">
        <form onSubmit={onSubmitAuth} action="POST" className=" flex flex-col ">
          <label>Имя пользователя:</label>
          <input  required
                  type="text" name='name'
                  className="w-full rounded-md mb-5 border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Введите имя..."/>
          <label>Пароль:</label>
          <input  required
                  type="text" name='password'
                  className="w-full rounded-md mb-6 border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Введите пароль..."/>
          <button className="bg-cyan-500 text-white
           hover:bg-cyan-500/80 cursor-pointer text-sm py-2 rounded-md">Войти</button>
        </form>
      </div>
    </div>
  )
}