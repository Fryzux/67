import '../styles.css';
import { LinearProgress } from '@mui/material';

export default function Stats({ progress = 75 }) {
  return (
    <div className="page">
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h2>Статистика прогресса</h2>
        <LinearProgress variant="determinate" value={progress} />
        <p>{progress}% завершено</p>
      </div>
    </div>
  );
}