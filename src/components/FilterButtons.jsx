import React from 'react'
import './FilterButtons.css'

function FilterButtons({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Все', emoji: '📚' },
    { id: 'not-started', label: 'Не начато', emoji: '⭕' },
    { id: 'in-progress', label: 'В процессе', emoji: '⏳' },
    { id: 'completed', label: 'Изучено', emoji: '✅' }
  ]

  return (
    <div className="filter-buttons">
      <h3>Фильтры</h3>
      <div className="filter-container">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            <span className="filter-emoji">{filter.emoji}</span>
            <span className="filter-label">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterButtons