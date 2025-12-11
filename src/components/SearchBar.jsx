// src/components/SearchBar.jsx
import React from 'react'

export default function SearchBar({ value = '', onChange = () => {}, placeholder = 'Поиск...' }) {
  return (
    <div className="search" role="search" style={{alignItems:'center'}}>
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden style={{opacity:0.9}}>
        <path fill="currentColor" d="M21 20l-4.35-4.35a7 7 0 10-1.414 1.414L20 21zM6.5 11a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/>
      </svg>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Поиск технологий"
        style={{width: '100%'}}
      />
    </div>
  )
}
