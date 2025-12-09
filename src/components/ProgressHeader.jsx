import React from 'react'
import './ProgressHeader.css'

function ProgressHeader({ technologies }) {
  // Рассчитываем статистику
  const total = technologies.length
  const completed = technologies.filter(tech => tech.status === 'completed').length
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="progress-header">
      <div className="stats-container">
        <div className="stat-item">
          <h3>Всего</h3>
          <p className="stat-value">{total}</p>
        </div>
        <div className="stat-item">
          <h3>Не начато</h3>
          <p className="stat-value status-not-started">{notStarted}</p>
        </div>
        <div className="stat-item">
          <h3>В процессе</h3>
          <p className="stat-value status-in-progress">{inProgress}</p>
        </div>
        <div className="stat-item">
          <h3>Изучено</h3>
          <p className="stat-value status-completed">{completed}</p>
        </div>
      </div>
      
      <div className="progress-info">
        <div className="progress-text">
          <span>Прогресс изучения:</span>
          <strong>{percentage}%</strong>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressHeader