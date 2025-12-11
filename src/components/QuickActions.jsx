// src/components/QuickActions.jsx
import React from 'react'

export default function QuickActions({
  technologies = [],
  onMarkAllCompleted = () => {},
  onResetAll = () => {},
  onRandomSelect = () => {},
  exportData = () => {},
  importData = () => {}
}) {
  const total = technologies.length
  const completed = technologies.filter(t => t.status === 'completed').length

  return (
    <div className="quick-actions" style={{width:'100%'}}>
      {/* header is provided by panel wrapper */}
      <div style={{marginBottom:12, fontWeight:800, color:'inherit'}}> {/* placeholder */}</div>

      <button className="action action-accent" onClick={onMarkAllCompleted} type="button">
        <span>✅ Отметить все как выполненные</span>
        <small style={{opacity:0.9}}>{completed}/{total}</small>
      </button>

      <button className="action action-danger" onClick={onResetAll} type="button">
        <span>🔄 Сбросить все статусы</span>
      </button>

      <button className="action action-green" onClick={onRandomSelect} type="button">
        <span>🎲 Случайный выбор</span>
        <small style={{opacity:0.95}}>{total}</small>
      </button>

      <button className="action action-ghost" onClick={exportData} type="button">
        <span>📤 Экспорт данных</span>
      </button>

      <button className="action action-orange" onClick={importData} type="button">
        <span>📥 Импорт данных</span>
      </button>
    </div>
  )
}
