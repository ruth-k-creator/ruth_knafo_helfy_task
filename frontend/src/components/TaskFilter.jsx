import React from 'react';
import '../styles/TaskFilter.css';

const OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' }
];

function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="task-filter">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`task-filter-btn ${filter === opt.value ? 'active' : ''}`}
          onClick={() => onFilterChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;