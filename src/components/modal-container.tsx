import { useState } from 'react';
import { Modal } from './modal';
export function ExportModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Открыть модальное окно
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Пример модального окна"
      >
        <div>
          <p>Это содержимое модального окна.</p>
          <p>Здесь может быть любой React-компонент.</p>
          <button onClick={() => setIsModalOpen(false)}>
            Закрыть
          </button>
        </div>
      </Modal>
    </div>
  )
}
