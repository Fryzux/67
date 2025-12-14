import React, { useState, useMemo, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './theme/muiTheme'
import Navigation from './components/Navigation'
import TechnologyList from './pages/TechnologyList'
import Stats from './pages/Stats'

function App() {
  const [mode, setMode] = useState(localStorage.getItem('mui-theme') || 'dark')

  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  )

  useEffect(() => {
    document.body.classList.toggle('light', mode === 'light')
  }, [mode])

  const toggleTheme = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    localStorage.setItem('mui-theme', next)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation dark={mode === 'dark'} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<TechnologyList />} />
        <Route path="/technologies" element={<TechnologyList />} />
        <Route path="/dashboard" element={<TechnologyList />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<div className="page">Настройки</div>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
