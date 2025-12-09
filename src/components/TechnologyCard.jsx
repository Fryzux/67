import React from 'react'
import './TechnologyCard.css'

function TechnologyCard({ title, description, status }) {
  // Определяем иконку и стиль в зависимости от статуса
  const getStatusInfo = () => {
    switch (status) {
      case 'completed':
        return {
          icon: '✅',
          className: 'technology-card completed',
          statusText: 'Изучено'
        }
      case 'in-progress':
        return {
          icon: '⏳',
          className: 'technology-card in-progress',
          statusText: 'В процессе'
        }
      case 'not-started':
        return {
          icon: '⭕',
          className: 'technology-card not-started',
          statusText: 'Не начато'
        }
      default:
        return {
          icon: '❓',
          className: 'technology-card',
          statusText: 'Неизвестно'
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className={statusInfo.className}>
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