// src/components/FilterButtons.jsx
import React from 'react'

const FILTERS = [
  { id: 'all', label: 'Все', icon: '📚' },
  { id: 'not-started', label: 'Не начато', icon: '⭕' },
  { id: 'in-progress', label: 'В процессе', icon: '⏳' },
  { id: 'completed', label: 'Изучено', icon: '✅' },
]

export default function FilterButtons({ activeFilter, onFilterChange }) {
  return (
    <div style={{width:'100%'}}>
      {/* Заголовок панели (если нужен, он уже есть в обёртке) */}
      <div style={{marginBottom:12, fontWeight:800, color:'inherit'}}> {/* no white inner */}
        {/* optional local title */}
      </div>

      {/* Кнопки напрямую внутри панели — без inner-card */}
      <div>
        {FILTERS.map(f => (
          <button
            key={f.id}
            type="button"
            className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => onFilterChange(f.id)}
            aria-pressed={activeFilter === f.id}
          >
            <span className="icon" aria-hidden style={{opacity:0.95}}>{f.icon}</span>
            <span style={{flex:1, textAlign:'left'}}>{f.label}</span>
            {activeFilter === f.id && <span style={{opacity:0.9, fontWeight:800}}>●</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
