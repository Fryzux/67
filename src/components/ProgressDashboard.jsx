import React from 'react'
import ProgressBar from './ProgressBar/ProgressBar'
import './ProgressDashboard.css'

function ProgressDashboard({ categoryProgress, overallProgress }) {
  // Цвета для категорий
  const categoryColors = {
    frontend: '#45b7d1',
    backend: '#ff6b6b',
    database: '#96c93d',
    tools: '#ffa502'
  }

  // Названия категорий
  const categoryNames = {
    frontend: 'Фронтенд',
    backend: 'Бэкенд',
    database: 'Базы данных',
    tools: 'Инструменты'
  }

  return (
    <div className="progress-dashboard">
      <h2>📊 Детальная статистика прогресса</h2>
      
      {/* Основной прогресс */}
      <div className="dashboard-section">
        <h3>Общий прогресс</h3>
        <ProgressBar
          progress={overallProgress}
          label="Общий прогресс изучения"
          color="#45b7d1"
          height={25}
          animated={true}
        />
      </div>

      {/* Прогресс по категориям */}
      <div className="dashboard-section">
        <h3>Прогресс по категориям</h3>
        <div className="category-progress-grid">
          {categoryProgress.map((item) => (
            <div key={item.category} className="category-item">
              <div className="category-header">
                <span className="category-name">
                  {categoryNames[item.category] || item.category}
                </span>
                <span className="category-stats">
                  {item.completed}/{item.total}
                </span>
              </div>
              <ProgressBar
                progress={item.progress}
                height={16}
                showLabel={false}
                showPercentage={true}
                color={categoryColors[item.category] || '#45b7d1'}
                className={`category-${item.category}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Сводка */}
      <div className="dashboard-summary">
        <h3>📈 Сводка</h3>
        <div className="summary-grid">
          {categoryProgress.map((item) => (
            <div key={item.category} className="summary-item">
              <div 
                className="summary-color" 
                style={{ backgroundColor: categoryColors[item.category] }}
              />
              <div className="summary-info">
                <div className="summary-title">
                  {categoryNames[item.category] || item.category}
                </div>
                <div className="summary-progress">
                  {item.progress}% · {item.completed} из {item.total}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressDashboard