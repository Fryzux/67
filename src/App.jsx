import React, { useState, useEffect } from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import FilterButtons from './components/FilterButtons'
import TechnologyNotes from './components/TechnologyNotes'
import SearchBar from './components/SearchBar'

function App() {
  // Состояние для хранения технологий (загружаем из localStorage если есть)
  const [technologies, setTechnologies] = useState(() => {
    // Загружаем из localStorage при инициализации
    const saved = localStorage.getItem('techTrackerData')
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        title: 'React Components', 
        description: 'Изучение базовых компонентов React, их жизненного цикла и принципов работы.', 
        status: 'not-started',
        notes: ''
      },
      { 
        id: 2, 
        title: 'JSX Syntax', 
        description: 'Освоение синтаксиса JSX, понимание различий между JSX и HTML.', 
        status: 'not-started',
        notes: ''
      },
      { 
        id: 3, 
        title: 'State Management', 
        description: 'Работа с состоянием компонентов, использование useState и useEffect хуков.', 
        status: 'not-started',
        notes: ''
      },
      { 
        id: 4, 
        title: 'Props & Context', 
        description: 'Передача данных между компонентами и использование Context API.', 
        status: 'not-started',
        notes: ''
      },
      { 
        id: 5, 
        title: 'React Router', 
        description: 'Настройка маршрутизации в React-приложениях.', 
        status: 'not-started',
        notes: ''
      },
      { 
        id: 6, 
        title: 'Redux Toolkit', 
        description: 'Управление глобальным состоянием приложения с помощью Redux Toolkit.', 
        status: 'not-started',
        notes: ''
      }
    ]
  })

  // Состояние для активного фильтра
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Состояние для поискового запроса
  const [searchQuery, setSearchQuery] = useState('')

  // useEffect для сохранения в localStorage при изменении technologies
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies))
    console.log('✅ Данные сохранены в localStorage')
  }, [technologies])

  // Функция для изменения статуса технологии
  const handleStatusChange = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          // Циклически меняем статус: not-started → in-progress → completed → not-started
          const statusOrder = ['not-started', 'in-progress', 'completed']
          const currentIndex = statusOrder.indexOf(tech.status)
          const nextIndex = (currentIndex + 1) % statusOrder.length
          return { ...tech, status: statusOrder[nextIndex] }
        }
        return tech
      })
    )
  }

  // Функция для изменения заметок технологии
  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    )
  }

  // Функция для отметки всех как выполненных
  const markAllAsCompleted = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    )
  }

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    )
  }

  // Функция для случайного выбора следующей технологии
  const selectRandomTech = () => {
    const notStartedTechs = technologies.filter(tech => tech.status === 'not-started')
    
    if (notStartedTechs.length === 0) {
      alert('🎉 Все технологии уже начаты или завершены!')
      return
    }
    
    const randomTech = notStartedTechs[Math.floor(Math.random() * notStartedTechs.length)]
    handleStatusChange(randomTech.id)
    alert(`🎲 Выбрана технология: ${randomTech.title}`)
  }

  // Фильтрация технологий по статусу
  const filteredByStatus = technologies.filter(tech => {
    switch (activeFilter) {
      case 'not-started': return tech.status === 'not-started'
      case 'in-progress': return tech.status === 'in-progress'
      case 'completed': return tech.status === 'completed'
      default: return true // 'all'
    }
  })

  // Фильтрация по поисковому запросу
  const filteredTechnologies = filteredByStatus.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.notes.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Функция для очистки всех заметок
  const clearAllNotes = () => {
    setTechnologies(prevTech =>
      prevTech.map(tech => ({ ...tech, notes: '' }))
    )
  }

  // Функция для очистки localStorage
  const resetLocalStorage = () => {
    localStorage.removeItem('techTrackerData')
    window.location.reload()
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Трекер изучения технологий</h1>
        <p>Отслеживайте свой прогресс в изучении современных технологий</p>
        
        <div className="storage-info">
          <button 
            className="storage-btn clear-notes-btn"
            onClick={clearAllNotes}
          >
            🗑️ Очистить все заметки
          </button>
          <button 
            className="storage-btn reset-storage-btn"
            onClick={resetLocalStorage}
          >
            🔄 Сбросить данные
          </button>
          <span className="save-indicator" title="Данные автоматически сохраняются">
            💾 Автосохранение
          </span>
        </div>
      </header>

      <ProgressHeader technologies={technologies} />
      
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultsCount={filteredTechnologies.length}
        totalCount={technologies.length}
      />
      
      <QuickActions 
        onMarkAllCompleted={markAllAsCompleted}
        onResetAll={resetAllStatuses}
        onRandomSelect={selectRandomTech}
        technologies={technologies}
      />
      
      <FilterButtons 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="technology-list">
        {filteredTechnologies.map(tech => (
          <div key={tech.id} className="technology-card-wrapper">
            <TechnologyCard
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusChange={handleStatusChange}
            />
            <TechnologyNotes
              techId={tech.id}
              notes={tech.notes}
              onNotesChange={updateTechnologyNotes}
            />
          </div>
        ))}
        
        {filteredTechnologies.length === 0 && (
          <div className="no-results">
            <p>🔍 Технологии не найдены</p>
            <p>Попробуйте изменить поисковый запрос или фильтр</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App