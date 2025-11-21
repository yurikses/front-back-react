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
    // Convert the JavaScript object to a JSON string
    const jsonString = JSON.stringify(datsExport, null, 2); // null, 2 for pretty-printing

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // Set the download filename

    // Programmatically click the anchor element to trigger download
    document.body.appendChild(a); // Append to body to ensure it's in the DOM
    a.click();

    // Clean up: remove the anchor element and revoke the object URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsModalOpen(false)
  }


  return (
    <div className=" flex flex-col w-1/2 px-4 py-2">
      <h3 className="text-xl font-bold mb-2">Быстрые действия</h3>
      <div className="flex gap-2 text-gray-100">
        <button onClick={onAllComplete} className="bg-green-600 px-2 py-1 rounded-md">
          ✅ Отметить все как выполненные
        </button>
        <button onClick={onResetAll} className="bg-blue-600 px-2 py-1 rounded-md">
          🔄 Сбросить все статусы
        </button>
        <button onClick={handleExport} className="bg-red-600 px-2 py-1 rounded-md">
          📤 Экспорт данных
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Экспорт данных"
      >
        <div>
          <p>Содержимое файла: </p>
          <textarea className="w-full h-[15rem]" value={JSON.stringify(datsExport, null, 2)} onChange={(e)=>e.preventDefault()}></textarea>
          <button className="bg-blue-500/80 text-neutral-100 rounded-md px-2 py-1" onClick={exportData}>
            Экспортировать
          </button>
        </div>
      </Modal>
    </div>
  );

}