import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username)

      if (onLogin) {
        onLogin(username)
      }

      navigate('/dashboard')
    } else {
      alert('Неверный логин или пароль')
    }
  }

  return (
    <div className="page container">
      <div className="card" style={{maxWidth:520, margin:'24px auto'}}>
        <h1>Вход</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group" style={{marginBottom:12}}>
            <label>Логин</label>
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group" style={{marginBottom:12}}>
            <label>Пароль</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
            <button type="submit" className="btn">Войти</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
