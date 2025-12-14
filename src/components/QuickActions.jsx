
import { Button, Stack, Snackbar, Alert } from '@mui/material'
import { useState, useRef } from 'react'

export default function QuickActions({
  technologies = [],
  onMarkAllCompleted,
  onResetAll,
  onRandomSelect,
  exportData,
  importData
}) {
  const fileInputRef = useRef(null)
  const [snack, setSnack] = useState({ open: false, msg: '', type: 'success' })

  const showSnack = (msg, type = 'success') =>
    setSnack({ open: true, msg, type })

  const handleRandom = () => {
    if (!technologies.length) {
      showSnack('Нет технологий для выбора', 'warning')
      return
    }
    onRandomSelect()
  }

  return (
    <>
      <Stack spacing={1} className="quick-actions">
        <Button className="btn btn-random" onClick={handleRandom}>
          🎲 Случайная технология
        </Button>
        <Button className="btn btn-complete" onClick={onMarkAllCompleted}>
          Отметить все как выполненные
        </Button>
        <Button className="btn btn-reset" onClick={onResetAll}>
          Сбросить статусы
        </Button>
        <Button className="btn btn-export" onClick={exportData}>
          Экспорт данных
        </Button>
        <Button className="btn btn-import" onClick={() => fileInputRef.current.click()}>
          Импорт данных
        </Button>
      </Stack>

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="application/json"
        onChange={importData}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type} variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  )
}
