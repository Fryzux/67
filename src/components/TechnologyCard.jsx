import React from 'react'
import './TechnologyCard.css'

function TechnologyCard({ id, title, description, status, deadline, onStatusChange }) {
  const handleClick = () => {
    if (onStatusChange) {
      onStatusChange(id)
    }
  }

  const getStatusInfo = () => {
    switch (status) {
      case 'completed':
        return {
          icon: '✅',
          className: 'technology-card status-completed',
          statusText: 'Изучено',
        }
      case 'in-progress':
        return {
          icon: '⏳',
          className: 'technology-card status-in-progress',
          statusText: 'В процессе',
        }
      default:
        return {
          icon: '⭕',
          className: 'technology-card status-not-started',
          statusText: 'Не начато',
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
        <div>
          <h3>{title}</h3>
          <span className="card-id">#{id}</span>
        </div>
        <span className="status-icon">{statusInfo.icon}</span>
      </div>

      <div className="card-content">
        <p>{description}</p>

        {deadline && (
          <p className="card-deadline">
            Дедлайн: <strong>{deadline}</strong>
          </p>
        )}

        <div className="card-footer">
          <span className={`status-badge ${status}`}>
            {statusInfo.statusText}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TechnologyCard
