export function TechnologyNotes({ notes, onNotesChange, techId }: {notes: string, onNotesChange: (id:number, notes: string) => void, techId: number}) {
  const hasNotes = notes.length > 0;

  return (
    <section className="mt-6 rounded-lg border border-gray-200 bg-white/70 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className='text-sm font-semibold text-gray-900'>Мои заметки</h4>
        <span className={`text-[11px] rounded-full px-2 py-0.5 ${hasNotes ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
          {hasNotes ? `Сохранено (${notes.length} символов)` : 'Добавьте заметку'}
        </span>
      </div>

      <textarea
        className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm leading-snug focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты, ссылки, идеи по изучению..."
        rows={4}
      />
    </section>
  );
}
