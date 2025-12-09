import React from 'react'
import './ProgressHeader.css'

function ProgressHeader({ technologies }) {
  // Рассчитываем статистику
  const total = technologies.length
  const completed = technologies.filter(tech => tech.status === 'completed').length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="progress-header">
      <div className="stats-container">
        <div className="stat-item">
          <h3>Общее количество</h3>
          <p className="stat-value">{total}</p>
        </div>
        <div className="stat-item">
          <h3>Изучено</h3>
          <p className="stat-value completed-stat">{completed}</p>
        </div>
        <div className="stat-item">
          <h3>Прогресс</h3>
          <p className="stat-value">{percentage}%</p>
        </div>
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
  )
}

export default ProgressHeader