import React from 'react'
import './TechnologyCard.css'

function TechnologyCard({ id, title, description, status, onStatusChange }) {
  // Функция для обработки клика - циклически меняем статус
  const handleClick = () => {
    if (onStatusChange) {
      onStatusChange(id)
    }
  }

  // Определяем иконку и стиль в зависимости от статуса
  const getStatusInfo = () => {
    switch (status) {
      case 'completed':
        return {
          icon: '✅',
          className: 'technology-card status-completed',
          statusText: 'Изучено'
        }
      case 'in-progress':
        return {
          icon: '⏳',
          className: 'technology-card status-in-progress',
          statusText: 'В процессе'
        }
      case 'not-started':
      default:
        return {
          icon: '⭕',
          className: 'technology-card status-not-started',
          statusText: 'Не начато'
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div 
      className={statusInfo.className} 
      onClick={handleClick}
      title="Нажмите, чтобы изменить статус"
    >
      <div className="card-header">
        <h3>{title}</h3>
        <span className="status-icon">{statusInfo.icon}</span>
      </div>
      <div className="card-content">
        <p>{description}</p>
        <div className="card-footer">
          <span className="status-badge">{statusInfo.statusText}</span>
        </div>
      </div>
    </div>
  )
}

export default TechnologyCard