// src/pages/TechnologyList.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTechnologies from '../hooks/useTechnologies'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import FilterButtons from '../components/FilterButtons'
import SearchBar from '../components/SearchBar'
import TechnologyNotes from '../components/TechnologyNotes'
import Modal from '../components/Modal/Modal'
import AddTechnologyForm from '../components/AddTechnologyForm/AddTechnologyForm'
import QuickActions from '../components/QuickActions'

function TechnologyList() {
  const {
    technologies,
    updateNotes,
    addTechnology,
    deleteTechnology,
    markAllAsCompleted,
    resetAllStatuses,
    exportData,
    importData
  } = useTechnologies()

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const navigate = useNavigate()
  const { technologies: apiTechnologies } = useTechnologiesApi()

  useEffect(() => {
    if (Array.isArray(apiTechnologies) && apiTechnologies.length > 0 && technologies.length === 0) {
      apiTechnologies.forEach(tech => {
        addTechnology({
          title: tech.title,
          description: tech.description,
          category: tech.category || 'other',
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiTechnologies])

  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter !== 'all' && tech.status !== activeFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        (tech.title && tech.title.toLowerCase().includes(q)) ||
        (tech.description && tech.description.toLowerCase().includes(q)) ||
        (tech.notes && tech.notes.toLowerCase().includes(q)) ||
        (tech.category && tech.category.toLowerCase().includes(q))
      )
    }
    return true
  })

  const handleDeleteTechnology = (id) => {
    if (window.confirm('Вы уверены?')) deleteTechnology(id)
  }

  const handleRandomSelect = () => {
    if (technologies.length === 0) return
    const randomTech = technologies[Math.floor(Math.random() * technologies.length)]
    navigate(`/technology/${randomTech.id}`)
  }

  return (
    <div className="page container">
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
        <div>
          <h1>📚 Список технологий</h1>
          <p className="muted">Управляйте статусами и заметками</p>
        </div>

        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={() => setShowAddModal(true)}>➕ Добавить технологию</button>
          <button className="btn ghost" onClick={handleRandomSelect}>🎲 Случайная</button>
        </div>
      </header>

      <div style={{display:'grid', gridTemplateColumns: '320px 1fr 320px', gap:20}} className="main-grid">
        {/* Left: filters (vertical column) */}
        <div className="controls-vertical">
          <div className="panel card">
            <h3>Фильтры</h3>
            <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} technologies={technologies} />
          </div>

          <div className="panel card">
            <h3>Поиск</h3>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Поиск..." />
          </div>
        </div>

        {/* Center: list */}
        <main>
          <div className="tech-list">
            {filteredTechnologies.map(tech => (
              <div key={tech.id} className="card" style={{display:'grid', gap:10}}>
                <div className="card-top">
                  <div style={{flex:1, minWidth:0}}>
                    <h3 style={{margin:0}}>{tech.title}</h3>
                    <p className="muted">{tech.description}</p>
                  </div>

                  <div style={{display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end'}}>
                    <span className="badge">{tech.status}</span>
                    <div style={{display:'flex', gap:8}}>
                      <button className="btn small" onClick={() => navigate(`/technology/${tech.id}`)}>Подробнее</button>
                      <button className="btn small ghost" onClick={() => handleDeleteTechnology(tech.id)}>🗑️</button>
                    </div>
                  </div>
                </div>

                <TechnologyNotes techId={tech.id} notes={tech.notes} onNotesChange={updateNotes} />
              </div>
            ))}
          </div>
        </main>

        {/* Right: quick actions */}
        <aside>
          <div className="card quick-actions">
            <h3>⚡ Быстрые действия</h3>
            <QuickActions
              technologies={technologies}
              onMarkAllCompleted={markAllAsCompleted}
              onResetAll={resetAllStatuses}
              onRandomSelect={handleRandomSelect}
              exportData={exportData}
              importData={importData}
            />
          </div>
        </aside>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="➕ Добавить технологию">
        <AddTechnologyForm onAdd={addTechnology} onClose={() => setShowAddModal(false)} />
      </Modal>
    </div>
  )
}

export default TechnologyList
