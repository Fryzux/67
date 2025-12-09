import React, { useEffect } from 'react'
import './Modal.css'

// Переиспользуемый компонент модального окна
function Modal({ isOpen, onClose, title, children, size = 'medium' }) {
  // Закрытие по ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Если модалка закрыта - не показываем ничего
  if (!isOpen) {
    return null
  }

  // Функция для закрытия модалки при клике на фон
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  // Определяем размер модалки
  const sizeClass = `modal-size-${size}`

  return (
    <div className="modal-background" onClick={handleBackgroundClick}>
      <div className={`modal-window ${sizeClass}`}>
        {/* Шапка модалки с заголовком и кнопкой закрытия */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>

        {/* Основное содержимое модалки */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
