export function Modal({ isOpen, onClose, title, children } : {isOpen: boolean, onClose: () => void, title: string , children: React.ReactNode}) {

  if (!isOpen) {
    return null;
  }
  // @ts-ignore
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40" onClick={handleBackgroundClick}>
      <div className="w-[min(32rem,90vw)] max-h-[80vh] overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="font-semibold text-base text-gray-900 truncate mr-2">{title}</h2>
          <button className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="px-4 py-3 overflow-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
}