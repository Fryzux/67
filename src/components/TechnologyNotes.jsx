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
      {/* HEADER — раскрытие */}
      <div 
        className="notes-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="notes-toggle">
          {isExpanded ? '▼' : '▶'} Заметки
        </span>

        <span className="notes-counter">
          {notes.length > 0 ? `${notes.length} символов` : 'Нет'}
        </span>
      </div>
      
      {/* CONTENT */}
      {isExpanded && (
        <div className="notes-content">
          <textarea
            value={localNotes}
            onChange={handleChange}
            placeholder="Записывайте сюда важные мысли, идеи и прогресс..."
            rows="4"
            className="notes-textarea"
          />

          <div className="notes-hint">
            {notes.length > 0 ? (
              <span className="notes-saved">
                💾 Изменения сохранены ({notes.length} символов)
              </span>
            ) : (
              <span className="notes-empty">
                ✏️ Добавьте заметку для этой технологии
              </span>
            )}

            <small style={{display:'block', opacity:0.7, marginTop:4}}>
              Сохраняется автоматически
            </small>
          </div>
        </div>
      )}
    </div>
  )
}

export default TechnologyNotes
