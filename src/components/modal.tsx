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
    <div className="fixed w-full h-full top-0 left-0 flex bg-black/20" onClick={handleBackgroundClick}>
      <div className=" w-fit h-fit bg-white p-2 m-auto rounded-md self-center p-1">
        {/* Шапка модалки с заголовком и кнопкой закрытия */}
        <div className=" flex justify-between mb-2">
          <h2 className="font-semibold text-xl">{title}</h2>
          <button className=" px-2 text-center" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Основное содержимое модалки */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}