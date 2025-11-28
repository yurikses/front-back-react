import {useState} from "react";
import type {Technology} from "../App.tsx";
import {Modal} from "./modal.tsx";
import { Spinner } from "@/components/ui/spinner"

export function QuickActions({onResetAll, onImportData, onAllComplete, technologies} :  {onResetAll: () => void, onAllComplete: () => void, onImportData: (data: string) => void, technologies: Technology[]}) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonData, setJsonData] = useState('');
  const [fileName, setFileName] = useState('');

  const [datsExport, setDatsExport] = useState({
    exportedAt: new Date().toISOString(),
    technologies: technologies
  })
  const handleExport = () => {
    setDatsExport({
      exportedAt: new Date().toISOString(),
      technologies: technologies
    })
    setIsExportModalOpen(true)
  }

  const exportData = ()=>{
    const jsonString = JSON.stringify(datsExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false)
  }

  const readJsonFile = (file: File) =>{
    const promiseFileReader =  new Promise((resolve: (value: any)=>void, reject) => {
      const fileReader = new FileReader()
      setIsLoading(true)
      fileReader.onload = event => {
        if (event.target) {
          resolve(JSON.parse(event.target.result as string))
        }
      }

      fileReader.onerror = error => reject(error)
      fileReader.readAsText(file)
    })
    promiseFileReader.then((value: object) => {setJsonData(JSON.stringify(value, null ,2)); setIsLoading(false)})
  }

  const importDataFromJson = () =>{
    alert('Данные успешно загружены! ')
    onImportData(jsonData)
    setJsonData('')
    setFileName('')
    setIsImportModalOpen(false)
  }

  return (
    <aside className="w-full lg:w-80 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--card-foreground)] shadow-sm px-4 py-3 flex flex-col gap-3">
      <h3 className="text-base font-semibold">
        Быстрые действия
      </h3>
      <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
        <button
          onClick={onAllComplete}
          className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
        >
          ✅ Отметить всё как выполненные
        </button>
        <button
          onClick={onResetAll}
          className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
        >
          🔄 Сбросить все статусы
        </button>
        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
        >
          📤 Экспорт данных
        </button>
        <button
          onClick={()=>setIsImportModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          📥 Импорт данных
        </button>
      </div>

      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Экспорт данных"
      >
        <div className="space-y-3">
          <p className="text-sm text-[color:var(--muted-foreground)] mb-1">Содержимое файла:</p>
          <textarea
            className="w-full h-[15rem] rounded-md border border-[color:var(--input)] bg-[color:var(--background)] px-2 py-1 text-xs font-mono leading-snug shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
            value={JSON.stringify(datsExport, null, 2)}
            onChange={(e)=>e.preventDefault()}
          />
          <button
            className="inline-flex items-center justify-center rounded-md bg-[color:var(--primary)] px-3 py-1.5 text-sm font-medium text-[color:var(--primary-foreground)] hover:bg-[color:color-mix(in_oklch,var(--primary)_90%,black_10%)]"
            onClick={exportData}
          >
            Экспортировать
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Импорт данных"
      >
        <div className="space-y-3 ">
          <p className="text-sm text-[color:var(--muted-foreground)] mb-1">Загрузите файл:</p>
          <div className="flex gap-2 items-center">
            <label
              htmlFor='fileUpload'
              className="cursor-pointer rounded-md bg-[color:var(--secondary)] px-2 py-1 text-sm text-[color:var(--secondary-foreground)] hover:bg-[color:color-mix(in_oklch,var(--secondary)_80%,black_20%)]"
            >
              Нажмите, чтобы выбрать файл
            </label>
            <input
              id="fileUpload"
              className="hidden"
              required
              type="file"
              accept="application/json"
              onChange={(e)=>{setFileName(e.target.files![0].name); readJsonFile(e.target.files![0])}}
            />
            <span className="text-sm text-[color:var(--foreground)] flex items-center gap-1">
              {isLoading ? (
                <>
                  Загрузка <Spinner />
                </>
              ) : fileName === '' ? null : (
                <>
                  Файл: <span className="font-medium">{fileName}</span>
                </>
              )}
            </span>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md bg-[color:var(--primary)] px-3 py-1.5 text-sm font-medium text-[color:var(--primary-foreground)] hover:bg-[color:color-mix(in_oklch,var(--primary)_90%,black_10%)] mt-2"
            onClick={importDataFromJson}
          >
            Импортировать
          </button>
        </div>
      </Modal>
    </aside>
  );

}