import { useState, useEffect } from 'react'

// Кастомный хук для работы с localStorage
function useLocalStorage(key, initialValue) {
  // Инициализируем состояние, пытаясь получить значение из localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Пытаемся получить значение по ключу из localStorage
      const item = window.localStorage.getItem(key)
      // Если значение найдено, парсим его из JSON, иначе используем initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // В случае ошибки (например, недоступный localStorage) используем initialValue
      console.error(`Ошибка чтения из localStorage ключа "${key}":`, error)
      return initialValue
    }
  })

  // useEffect для синхронизации состояния с localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error)
    }
  }, [key, storedValue])

  // Функция для обновления значения в состоянии и localStorage
  const setValue = (value) => {
    try {
      // Разрешаем value быть функцией, как в useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
    } catch (error) {
      console.error(`Ошибка обновления значения для ключа "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage