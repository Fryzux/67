import React, { useState } from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import FilterButtons from './components/FilterButtons'

function App() {
  // Состояние для хранения технологий
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов React, их жизненного цикла и принципов работы.', 
      status: 'not-started' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, понимание различий между JSX и HTML.', 
      status: 'not-started' 
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов, использование useState и useEffect хуков.', 
      status: 'not-started' 
    },
    { 
      id: 4, 
      title: 'Props & Context', 
      description: 'Передача данных между компонентами и использование Context API.', 
      status: 'not-started' 
    },
    { 
      id: 5, 
      title: 'React Router', 
      description: 'Настройка маршрутизации в React-приложениях.', 
      status: 'not-started' 
    },
    { 
      id: 6, 
      title: 'Redux Toolkit', 
      description: 'Управление глобальным состоянием приложения с помощью Redux Toolkit.', 
      status: 'not-started' 
    }
  ])

  // Состояние для активного фильтра
  const [activeFilter, setActiveFilter] = useState('all')

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
      alert('Все технологии уже начаты или завершены!')
      return
    }
    
    const randomTech = notStartedTechs[Math.floor(Math.random() * notStartedTechs.length)]
    handleStatusChange(randomTech.id)
    alert(`Выбрана технология: ${randomTech.title}`)
  }

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    switch (activeFilter) {
      case 'not-started': return tech.status === 'not-started'
      case 'in-progress': return tech.status === 'in-progress'
      case 'completed': return tech.status === 'completed'
      default: return true // 'all'
    }
  })

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Трекер изучения технологий</h1>
        <p>Отслеживайте свой прогресс в изучении современных технологий</p>
      </header>

      <ProgressHeader technologies={technologies} />
      
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
          <TechnologyCard
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  )
}

export default App