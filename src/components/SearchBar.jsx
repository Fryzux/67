import React from 'react'
import './SearchBar.css'

function SearchBar({ searchQuery, setSearchQuery, resultsCount, totalCount }) {
  return (
    <div className="search-bar">
      <div className="search-container">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          placeholder="Поиск технологий по названию, описанию или заметкам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button 
            className="clear-search-btn"
            onClick={() => setSearchQuery('')}
            title="Очистить поиск"
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="search-info">
        <span className="results-count">
          Найдено: <strong>{resultsCount}</strong> из {totalCount}
        </span>
        {searchQuery && resultsCount === 0 && (
          <span className="no-results-hint">
            🤔 Ничего не найдено. Попробуйте другие ключевые слова
          </span>
        )}
      </div>
    </div>
  )
}

export default SearchBar