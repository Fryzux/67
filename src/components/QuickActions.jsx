import React from 'react'
import './QuickActions.css'

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomSelect, technologies }) {
  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length
  
  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="actions-container">
        <button 
          className="action-btn mark-all-btn"
          onClick={onMarkAllCompleted}
        >
          ✅ Отметить все как выполненные
        </button>
        
        <button 
          className="action-btn reset-btn"
          onClick={onResetAll}
        >
          🔄 Сбросить все статусы
        </button>
        
        <button 
          className="action-btn random-btn"
          onClick={onRandomSelect}
          disabled={notStartedCount === 0}
          title={notStartedCount === 0 ? "Все технологии уже начаты" : ""}
        >
          🎲 Случайный выбор ({notStartedCount} доступно)
        </button>
      </div>
    </div>
  )
}

export default QuickActions