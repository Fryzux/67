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
          statusText: 'Изучено',
          statusColor: '#45b7d1'
        }
      case 'in-progress':
        return {
          icon: '⏳',
          className: 'technology-card status-in-progress',
          statusText: 'В процессе',
          statusColor: '#4ecdc4'
        }
      case 'not-started':
      default:
        return {
          icon: '⭕',
          className: 'technology-card status-not-started',
          statusText: 'Не начато',
          statusColor: '#ff6b6b'
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
        <div className="card-title-section">
          <h3>{title}</h3>
          <span className="card-id">#{id}</span>
        </div>
        <span className="status-icon">{statusInfo.icon}</span>
      </div>
      <div className="card-content">
        <p>{description}</p>
        <div className="card-footer">
          <span 
            className="status-badge"
            style={{ backgroundColor: statusInfo.statusColor }}
          >
            {statusInfo.statusText}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TechnologyCard