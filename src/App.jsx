import React from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'

function App() {
  // Тестовые данные
  const technologies = [
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов React, их жизненного цикла и принципов работы.', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, понимание различий между JSX и HTML.', 
      status: 'completed' 
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов, использование useState и useEffect хуков.', 
      status: 'in-progress' 
    },
    { 
      id: 4, 
      title: 'Props & Context', 
      description: 'Передача данных между компонентами и использование Context API.', 
      status: 'in-progress' 
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
    },
    { 
      id: 7, 
      title: 'Testing', 
      description: 'Написание unit-тестов для React-компонентов с использованием Jest и React Testing Library.', 
      status: 'not-started' 
    },
    { 
      id: 8, 
      title: 'Performance', 
      description: 'Оптимизация производительности React-приложений.', 
      status: 'not-started' 
    }
  ]

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Трекер изучения технологий</h1>
        <p>Отслеживайте свой прогресс в изучении современных технологий</p>
      </header>

      <ProgressHeader technologies={technologies} />

      <div className="technology-list">
        {technologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
          />
        ))}
      </div>
    </div>
  )
}

export default App