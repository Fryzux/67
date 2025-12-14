import '../styles.css';

export default function TechnologyList({ technologies }) {
  return (
    <div className="page">
      <div className="card">
        <h3>Фильтры</h3>
        <button className="filter-btn active">Все</button>
      </div>

      <div>
        {technologies.map(t => (
          <div key={t.id} className="card tech-card">
            <div className="tech-title">{t.name}</div>
            <div className="tech-desc">{t.description}</div>
            <button className="btn btn-primary">Подробнее</button>
            <button className="btn btn-danger">Удалить</button>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Быстрые действия</h3>
        <button className="quick-btn">Случайная технология</button>
        <button className="quick-btn">Экспорт данных</button>
        <button className="quick-btn">Импорт данных</button>
      </div>
    </div>
  );
}