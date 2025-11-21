import {useState} from "react";
import type {Technology} from "../App.tsx";
import {Modal} from "./modal.tsx";

export function QuickActions({onResetAll, onAllComplete, technologies} :  {onResetAll: () => void, onAllComplete: () => void, technologies: Technology[]}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datsExport, setDatsExport] = useState({
    exportedAt: new Date().toISOString(),
    technologies: technologies
  })
  const handleExport = () => {
    setDatsExport({
      exportedAt: new Date().toISOString(),
      technologies: technologies
    })
    setIsModalOpen(true)
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
    setIsModalOpen(false)
  }

  return (
    <aside className="w-full lg:w-80 rounded-lg border border-gray-200 bg-white/70 shadow-sm px-4 py-3 flex flex-col gap-3">
      <h3 className="text-base font-semibold text-gray-900">
        Быстрые действия
      </h3>
      <div className="flex flex-col gap-2 text-gray-100 sm:flex-row lg:flex-col">
        <button onClick={onAllComplete} className="inline-flex items-center justify-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium hover:bg-green-700">
          ✅ Отметить всё как выполненные
        </button>
        <button onClick={onResetAll} className="inline-flex items-center justify-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium hover:bg-blue-700">
          🔄 Сбросить все статусы
        </button>
        <button onClick={handleExport} className="inline-flex items-center justify-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium hover:bg-red-700">
          📤 Экспорт данных
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Экспорт данных"
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-700 mb-1">Содержимое файла:</p>
          <textarea
            className="w-full h-[15rem] rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-mono leading-snug"
            value={JSON.stringify(datsExport, null, 2)}
            onChange={(e)=>e.preventDefault()}
          />
          <button
            className="inline-flex items-center justify-center rounded-md bg-blue-600/90 px-3 py-1.5 text-sm font-medium text-neutral-100 hover:bg-blue-700"
            onClick={exportData}
          >
            Экспортировать
          </button>
        </div>
      </Modal>
    </aside>
  );

}