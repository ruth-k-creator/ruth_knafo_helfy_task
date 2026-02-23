import React, { useState } from 'react';
import '../styles/TaskForm.css';

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

function TaskForm({ onSubmit, initialTask, onCancel }) {
  const isEdit = Boolean(initialTask);
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [priority, setPriority] = useState(initialTask?.priority ?? 'medium');
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) {
      setValidationError('Title is required');
      return;
    }
    setValidationError('');
    setSubmitting(true);
    try {
      await onSubmit(
        isEdit ? { title: t, description: description.trim(), priority } : { title: t, description: description.trim(), priority }
      );
      if (!isEdit) {
        setTitle('');
        setDescription('');
        setPriority('medium');
      } else if (onCancel) onCancel();
    } catch (err) {
      // Error shown by App
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-row">
        <input
          type="text"
          className="task-form-input"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
          
        />
        <select
          className="task-form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={submitting}
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="task-form-textarea"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={submitting}
        rows={2}
      />
      {validationError && <div className="task-form-error">{validationError}</div>}
      <div className="task-form-actions">
        <button type="submit" className="task-form-submit" disabled={submitting}>
          {submitting ? 'Saving…' : isEdit ? 'Save' : 'Add Task'}
        </button>
        {isEdit && onCancel && (
          <button type="button" className="task-form-cancel" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
