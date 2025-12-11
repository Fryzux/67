// src/pages/TechnologyDetail.jsx
import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useTechnologies from '../hooks/useTechnologies'
import TechnologyNotes from '../components/TechnologyNotes'

function TechnologyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    technologies,
    updateStatus,
    updateNotes,
    deleteTechnology
  } = useTechnologies()

  const techId = Number(id)
  const technology = technologies.find(t => t.id === techId)

  if (!technology) {
    return (
      <div className="container card">
        <h1>Технология не найдена</h1>
        <Link to="/technologies" className="btn">← Назад</Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Удалить технологию?')) {
      deleteTechnology(techId)
      navigate('/technologies')
    }
  }

  return (
    <div className="page container">
      {/* Верхняя панель: заголовок + контролы */}
      <div className="row" style={{justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <button className="btn small" onClick={() => navigate(-1)}>← Назад</button>
          <h1 style={{margin:0}}>{technology.title}</h1>
        </div>

        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <div className="badge" style={{marginRight:8}}>{technology.status}</div>
          <button className="btn small" onClick={handleDelete} title="Удалить технологию">🗑️</button>
        </div>
      </div>

      <div className="card" style={{display:'grid', gridTemplateColumns: '1fr 320px', gap:16}}>
        <div>
          <h3>Описание</h3>
          <p>{technology.description}</p>
          <p className="muted">Категория: {technology.category}</p>
        </div>

        <aside className="card">
          <h3>Статус</h3>
          <div className="row" style={{gap:8, marginTop:8}}>
            <button
              className={technology.status === 'not-started' ? 'btn small' : 'btn small ghost'}
              onClick={() => updateStatus(techId, 'not-started')}
            >
              Не начато
            </button>

            <button
              className={technology.status === 'in-progress' ? 'btn small' : 'btn small ghost'}
              onClick={() => updateStatus(techId, 'in-progress')}
            >
              В процессе
            </button>

            <button
              className={technology.status === 'completed' ? 'btn small' : 'btn small ghost'}
              onClick={() => updateStatus(techId, 'completed')}
            >
              Завершено
            </button>
          </div>
        </aside>

        <div className="card" style={{gridColumn:'1 / -1'}}>
          <h3>Заметки</h3>
          <TechnologyNotes
            techId={techId}
            notes={technology.notes}
            onNotesChange={updateNotes}
          />
        </div>
      </div>
    </div>
  )
}

export default TechnologyDetail
