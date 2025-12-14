import React, { useState } from 'react'
import './TechnologyNotes.css'

function TechnologyNotes({ techId, notes, onNotesChange }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localNotes, setLocalNotes] = useState(notes)

  const handleChange = (e) => {
    const newNotes = e.target.value
    setLocalNotes(newNotes)
    onNotesChange(techId, newNotes)
  }

  return (
    <div className="technology-notes">
      <div 
        className="notes-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="notes-toggle">
          {isExpanded ? '▼' : '▶'} Заметки
        </span>
        <span className="notes-counter">
          {notes.length > 0 ? `${notes.length} симв.` : 'Нет заметок'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="notes-content">
          <textarea
            value={localNotes}
            onChange={handleChange}
            placeholder="Записывайте сюда важные моменты по изучению этой технологии..."
            rows="4"
            className="notes-textarea"
          />
          <div className="notes-hint">
            {notes.length > 0 ? (
              <span className="notes-saved">
                ✅ Заметка сохранена ({notes.length} символов)
              </span>
            ) : (
              <span className="notes-empty">
                ✏️ Добавьте заметку для этой технологии
              </span>
            )}
            <small>Заметки сохраняются автоматически</small>
          </div>
        </div>
      )}
    </div>
  )
}

export default TechnologyNotes