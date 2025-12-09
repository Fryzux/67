import React, { useState } from 'react'
import './AddTechnologyForm.css'

function AddTechnologyForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    priority: 1
  })

  const [errors, setErrors] = useState({})

  const categories = [
    { value: 'frontend', label: 'Фронтенд' },
    { value: 'backend', label: 'Бэкенд' },
    { value: 'database', label: 'Базы данных' },
    { value: 'tools', label: 'Инструменты' },
    { value: 'other', label: 'Другое' }
  ]

  const priorities = [
    { value: 1, label: 'Высокий', emoji: '🔥' },
    { value: 2, label: 'Средний', emoji: '⚡' },
    { value: 3, label: 'Низкий', emoji: '📘' }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Название слишком короткое'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Описание слишком короткое'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onAdd({
        ...formData,
        status: 'not-started',
        notes: ''
      })
      onClose()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'priority' ? parseInt(value) : value
    }))
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-tech-form">
      <div className="form-group">
        <label htmlFor="title">Название технологии *</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Например: React Hooks"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Описание *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Опишите, что нужно изучить..."
          rows="4"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Приоритет</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            {priorities.map(pri => (
              <option key={pri.value} value={pri.value}>
                {pri.emoji} {pri.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Отмена
        </button>
        <button type="submit" className="btn-primary">
          ➕ Добавить технологию
        </button>
      </div>
    </form>
  )
}

export default AddTechnologyForm