import {type User, useUser} from "@/hooks/useUser.tsx";
import {AuthorizedOnly} from "@/middlewares/authorized-only.tsx";
import useTechnologies, {type Category} from "@/hooks/useTechnologies.ts";
import {Modal} from "@/components/modal.tsx";
import {type FormEvent, type MouseEvent, useState} from "react";


export function SettingsPage(){
  const {user, setUser} = useUser()
  const {categories, setCategories} = useTechnologies()
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const addNewCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fornData = new FormData(e.target as HTMLFormElement);
    const name = fornData.get("name") as string;
    setCategories((prev: Category[])=>
      [...prev, {name: name} ]
    )
    setIsCategoryModalOpen(false);
  }

  const deleteCategory = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation()
    const target = e.target as HTMLFormElement;
    const name = target.dataset.name;
    setCategories((prev: Category[])=>
      prev.filter((category: Category)=> category.name != name )
    )
  }

  const updateUserName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation()
    const formData = new FormData(e.target as HTMLFormElement);
    const newName = formData.get("name") as string;

    // @ts-expect-error type incorrect
    setUser((user: User) => {
        return {...user, name: newName}
      }
    )
  }

  return (
    <div className="mx-auto w-fit min-w-1/2 pt-16 bg-[color:var(--background)] text-[color:var(--foreground)]">
      <AuthorizedOnly>
        <h1 className="text-center font-semibold mb-2">
          Настройки пользователя
        </h1>
        <main className="flex flex-col gap-2 sm:grid sm:grid-cols-2 rounded-md bg-[color:var(--card)] text-[color:var(--card-foreground)] shadow px-4 py-3">
          <section className="h-full">
            <div className="flex flex-col gap-2 w-full px-6 sm:px-10 items-center">
              <h2 className="text-sm font-semibold">
                Существующие категории
              </h2>
              <div className="flex flex-col w-full">
                {categories.length == 0 && (
                  <p className="text-sm text-center py-2 text-[color:var(--muted-foreground)]">
                    Категорий нет.
                    <br/>
                    Добавьте новую категорию
                  </p>
                )}
                {categories.map((category: Category, index: number) => (
                  <p
                    data-name={category.name}
                    className="flex justify-between items-center border border-[color:var(--border)] rounded-md px-3 py-2 mb-2 w-full text-sm"
                    key={index}
                  >
                    {category.name}
                    <button
                      data-name={category.name}
                      className="text-lg p-1 hover:text-red-500"
                      onClick={deleteCategory}
                    >
                      🗑️
                    </button>
                  </p>
                ))}
              </div>
              <button
                onClick={(e)=>{e.preventDefault(); setIsCategoryModalOpen(true)}}
                className="rounded-md bg-[color:var(--secondary)] px-2 py-1 text-sm text-[color:var(--secondary-foreground)] hover:bg-[color:color-mix(in_oklch,var(--secondary)_80%,black_20%)]"
              >
                Добавить категорию
              </button>
            </div>
          </section>

          <section className="flex flex-col w-full px-5 items-start gap-2 h-full justify-start">
            <h2 className="font-semibold text-sm">
              Настройки пользователя
            </h2>
            <form className="flex flex-col w-full h-full gap-1" onSubmit={updateUserName}>
              <label className="text-sm" htmlFor="">
                Ваше имя:
              </label>
              <input
                className="w-full rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-3 py-1.5 text-sm shadow-sm mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
                required
                defaultValue={user.name}
                placeholder="Введите ваше новое имя"
                type="text" name='name'
              />
              <button className="inline-flex items-center justify-center rounded-md bg-[color:var(--primary)] px-3 py-1.5 text-sm font-medium text-[color:var(--primary-foreground)] hover:bg-[color:color-mix(in_oklch,var(--primary)_90%,black_10%)] mt-auto">
                Сохранить
              </button>
            </form>
          </section>
        </main>

        <Modal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          title="Добавление новой категории"
        >
          <div className="space-y-3 ">
            <form
              onSubmit={addNewCategory}
              className="flex gap-2 flex-col"
            >
              <label htmlFor='fileUpload' className="text-sm">
                Название категории:
              </label>
              <input
                className="w-full rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-3 py-1.5 text-sm shadow-sm mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
                required
                placeholder="Введите название новой категории"
                type="text" name='name'
              />
              <button
                className="inline-flex items-center justify-center rounded-md bg-[color:var(--primary)] px-3 py-1.5 text-sm font-medium text-[color:var(--primary-foreground)] hover:bg-[color:color-mix(in_oklch,var(--primary)_90%,black_10%)] w-fit"
                type="submit"
              >
                Добавить
              </button>
            </form>
          </div>
        </Modal>
      </AuthorizedOnly>
    </div>
  )
}