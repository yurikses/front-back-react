export function TechnologyNotes({ notes, onNotesChange, techId }: {notes: string, onNotesChange: (id:number, notes: string) => void, techId: number}) {
  return (
    <div className="flex-grow flex flex-col gap-3 items-center">
      <h4 className='text-center'>Мои заметки:</h4>
      <textarea
        className="w-full rounded-md text-center"
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
        rows={3}
      />
      <div className="bg-blue-600/20 px-2 py-1 w-fit rounded text-gray-800 ">
        {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` :
          'Добавьте заметку'}
      </div>
    </div>
  );
}
