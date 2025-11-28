export function TechnologyNotes({ notes, onNotesChange, techId }: {notes: string, onNotesChange: (id:string, notes: string) => void, techId: string}) {
  const hasNotes = notes.length > 0;

  return (
    <section className="mt-6 rounded-lg border border-gray-200 bg-muted p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className='text-sm font-semibold text-gray-900 dark:text-gray-200'>Мои заметки</h4>
        <span className={`text-[11px] rounded-full px-2 py-0.5 ${hasNotes ? 'bg-blue-50 dark:bg-neutral-600 text-blue-500 dark:text-blue-200 border border-blue-200' : 'bg-gray-50 dark:bg-neutral-600 text-foreground border border-gray-200'}`}>
          {hasNotes ? `Сохранено (${notes.length} символов)` : 'Добавьте заметку'}
        </span>
      </div>

      <textarea
        className="w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-black/95 px-3 py-2 text-sm leading-snug focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты, ссылки, идеи по изучению..."
        rows={4}
      />
    </section>
  );
}
