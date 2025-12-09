import React, { useState } from 'react'
import './App.css'
import useTechnologies from './hooks/useTechnologies'
import TechnologyCard from './components/TechnologyCard'
import ProgressDashboard from './components/ProgressDashboard'
import QuickActions from './components/QuickActions'
import FilterButtons from './components/FilterButtons'
import SearchBar from './components/SearchBar'
import TechnologyNotes from './components/TechnologyNotes'
import Modal from './components/Modal/Modal'
import AddTechnologyForm from './components/AddTechnologyForm/AddTechnologyForm'


function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllAsCompleted,
    resetAllStatuses,
    addTechnology,
    deleteTechnology,
    progress: overallProgress,
    categoryProgress,
    exportData,
    importData
  } = useTechnologies()

  // Состояния для фильтров и поиска
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Функция для случайного выбора технологии
  const selectRandomTech = () => {
    const notStartedTechs = technologies.filter(tech => tech.status === 'not-started')
    
    if (notStartedTechs.length === 0) {
      alert('🎉 Все технологии уже начаты или завершены!')
      return
    }
    
    const randomTech = notStartedTechs[Math.floor(Math.random() * notStartedTechs.length)]
    updateStatus(randomTech.id)
    alert(`🎲 Выбрана технология: ${randomTech.title}`)
  }

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    // Фильтр по статусу
    if (activeFilter !== 'all' && tech.status !== activeFilter) {
      return false
    }
    
    // Поиск по всем полям
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        tech.title.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query) ||
        tech.notes.toLowerCase().includes(query) ||
        tech.category.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  // Обработчик удаления технологии
  const handleDeleteTechnology = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      deleteTechnology(id)
    }
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Трекер изучения технологий</h1>
        <p>Отслеживайте свой прогресс в изучении современных технологий</p>
        
        <button 
          className="add-tech-btn"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Добавить технологию
        </button>
      </header>

      <ProgressDashboard 
        categoryProgress={categoryProgress}
        overallProgress={overallProgress}
      />
      
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
        exportData={exportData}
        importData={importData}
      />
      
      <FilterButtons 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        technologies={technologies}
      />

      <div className="technology-list">
        {filteredTechnologies.map(tech => (
          <div key={tech.id} className="technology-card-wrapper">
            <div className="card-header-actions">
              <span className="tech-category">{tech.category}</span>
              <button 
                className="delete-tech-btn"
                onClick={() => handleDeleteTechnology(tech.id)}
                title="Удалить технологию"
              >
                🗑️
              </button>
            </div>
            <TechnologyCard
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusChange={updateStatus}
            />
            <TechnologyNotes
              techId={tech.id}
              notes={tech.notes}
              onNotesChange={updateNotes}
            />
          </div>
        ))}
        
        {filteredTechnologies.length === 0 && (
          <div className="no-results">
            <p>🔍 Технологии не найдены</p>
            <p>Попробуйте изменить поисковый запрос или фильтр</p>
            <button 
              className="add-tech-btn secondary"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Добавить первую технологию
            </button>
          </div>
        )}
      </div>

      {/* Модалка добавления новой технологии */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="➕ Добавить новую технологию"
        size="medium"
      >
        <AddTechnologyForm 
          onAdd={addTechnology}
          onClose={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  )
}

export default App