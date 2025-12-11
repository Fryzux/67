import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page">
      <header className="hero card">
        <h1>📚 Добро пожаловать!</h1>
        <p>Трекер технологий — следи за тем, что изучаешь, добавляй заметки и смотри прогресс.</p>

        <div className="row" style={{marginTop:12}}>
          <Link to="/technologies" className="btn">Перейти к списку технологий</Link>
          <Link to="/stats" className="btn ghost">Открыть статистику</Link>
          <Link to="/settings" className="btn ghost">Открыть настройки</Link>
        </div>
      </header>
    </div>
  )
}

export default Home
