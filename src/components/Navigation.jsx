// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation()
  const isActive = (path) =>
    location.pathname === path ||
    location.pathname === `/Technology-tracker${path === '/' ? '/' : path}`

  // theme: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('site-theme') || 'dark'
  })

  // accent: 'green' or 'blue'
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('site-accent') || 'green'
  })

  useEffect(() => {
    // remove both then add the selected theme class
    document.body.classList.remove('theme-dark', 'theme-light')
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
    localStorage.setItem('site-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.classList.remove('accent-green', 'accent-blue')
    document.body.classList.add(accent === 'green' ? 'accent-green' : 'accent-blue')
    localStorage.setItem('site-accent', accent)
  }, [accent])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleAccent = () => {
    setAccent(prev => (prev === 'green' ? 'blue' : 'green'))
  }

  return (
    <header className="nav container" style={{alignItems: 'center'}}>
      <div className="brand">
        <Link to="/" style={{display: 'flex', gap: 12, alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
          <div className="logo">T</div>
          <div style={{fontWeight:700}}>Technology Tracker</div>
        </Link>
      </div>

      <nav className="navlinks" aria-label="Главное меню">
        <Link to="/" className={isActive('/') ? 'active' : ''}>Главная</Link>
        <Link to="/technologies" className={isActive('/technologies') ? 'active' : ''}>Технологии</Link>
        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Дашборд</Link>
        <Link to="/stats" className={isActive('/stats') ? 'active' : ''}>Статистика</Link>
        <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>Настройки</Link>
      </nav>

      <div className="row" style={{gap: 8}}>
        {/* Theme toggle (light / dark) */}
        <button
          className="btn small"
          onClick={toggleTheme}
          title="Переключить тему (светлая / тёмная)"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>

        {/* Accent toggle (green / blue) */}
        <button
          className="accent-btn"
          onClick={toggleAccent}
          title="Переключить акцентный цвет"
        >
          <span className="accent-dot" aria-hidden />
        </button>

        <div style={{display:'flex', alignItems:'center', gap:8}}>
          {isLoggedIn ? (
            <>
              <span className="muted">👤 {username}</span>
              <button className="btn small" onClick={onLogout}>Выйти</button>
            </>
          ) : (
            <Link to="/login" className={isActive('/login') ? 'active' : ''}>Войти</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation
