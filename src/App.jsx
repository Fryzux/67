import React, { useState, useEffect, useMemo } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import Home from './pages/Home'
import TechnologyList from './pages/TechnologyList'
import TechnologyDetail from './pages/TechnologyDetail'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'

import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import { NotificationsProvider } from './components/NotificationsProvider'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  )

  const [username, setUsername] = useState(
    () => localStorage.getItem('username') || ''
  )

  const [mode, setMode] = useState(
    () => localStorage.getItem('themeMode') === 'dark' ? 'dark' : 'light'
  )

  useEffect(() => {
    document.querySelector('.App')?.classList.toggle('dark', mode === 'dark')
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const toggleMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleLogin = (user) => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', user)
    setIsLoggedIn(true)
    setUsername(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
    setUsername('')
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#0b1220',   // тёмно-синий
                  paper: '#111a2e',
                },
                text: {
                  primary: '#e8eefc',
                  secondary: '#9aa7c7',
                },
                primary: {
                  main: '#4da3ff',
                },
              }
            : {
                background: {
                  default: '#f5f5f7',
                  paper: '#ffffff',
                },
              }),
        },
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationsProvider>
        <div className="App">
          <div className="app-top-bar">
            <Navigation
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            />

            <IconButton
              color="inherit"
              onClick={toggleMode}
              aria-label="Переключить тему"
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Technology-tracker/" element={<Home />} />

            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:id" element={<TechnologyDetail />} />

            <Route path="/stats" element={<Stats />} />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </NotificationsProvider>
    </ThemeProvider>
  )
}

export default App
