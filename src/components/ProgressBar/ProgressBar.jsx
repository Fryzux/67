import React from 'react'
import './ProgressBar.css'

// Универсальный компонент прогресс-бара
function ProgressBar({
  progress,           // Текущее значение прогресса (от 0 до 100)
  label = '',        // Подпись к прогресс-бару
  color = '#45b7d1', // Цвет заполнения
  height = 20,       // Высота прогресс-бара
  showPercentage = true, // Показывать ли процент
  animated = false,  // Анимировать ли заполнение
  showLabel = true,  // Показывать ли лейбл
  className = ''     // Дополнительные классы
}) {
  // Обеспечиваем, чтобы прогресс был в пределах 0-100
  const normalizedProgress = Math.min(100, Math.max(0, progress))

  return (
    <div className={`progress-bar-container ${className}`}>
      {/* Заголовок с лейблом и процентом */}
      {(showLabel || showPercentage) && (
        <div className="progress-bar-header">
          {showLabel && label && (
            <span className="progress-label">{label}</span>
          )}
          {showPercentage && (
            <span className="progress-percentage">{normalizedProgress}%</span>
          )}
        </div>
      )}

      {/* Внешняя оболочка прогресс-бара */}
      <div 
        className="progress-bar-outer"
        style={{
          height: `${height}px`,
          borderRadius: `${height / 2}px`
        }}
      >
        {/* Заполняемая часть прогресс-бара */}
        <div
          className={`progress-bar-inner ${animated ? 'animated' : ''}`}
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: color,
            borderRadius: `${height / 2}px`
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar