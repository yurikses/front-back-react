export function Modal({ isOpen, onClose, title, children } : {isOpen: boolean, onClose: () => void, title: string , children: React.ReactNode}) {

  if (!isOpen) {
    return null;
  }
  // @ts-expect-error тип события общего обработчика клика не важен, используем сравнение target/currentTarget
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40" onClick={handleBackgroundClick}>
      <div className="w-[min(32rem,90vw)] max-h-[80vh] overflow-hidden rounded-xl bg-card text-card-foreground border border-border shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-secondary/70">
          <h2 className="font-semibold text-base truncate mr-2">{title}</h2>
          <button className="btn-ghost-icon h-7 w-7" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="px-4 py-3 overflow-auto max-h-[70vh] bg-card">
          {children}
        </div>
      </div>
    </div>
  );
}