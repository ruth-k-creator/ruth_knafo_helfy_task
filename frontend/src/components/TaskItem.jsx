import React, { useState } from 'react';
import TaskForm from './TaskForm';
import '../styles/TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onToggle, isEditing, onSetEditing }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleEditSubmit = async (updates) => {
    await onEdit(task.id, updates);
  };

  const priorityClass = `priority-${task.priority}`;

  return (
    <div className={`task-item ${priorityClass} ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-item-edit">
          <TaskForm
            initialTask={task}
            onSubmit={handleEditSubmit}
            onCancel={() => onSetEditing(null)}
          />
        </div>
      ) : (
        <>
          <div className="task-item-main">
            <button
              type="button"
              className="task-item-toggle"
              onClick={() => onToggle(task.id)}
              title={task.completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {task.completed ? '✓' : '○'}
            </button>
            <div className="task-item-content">
              <span className="task-item-title">{task.title}</span>
              {task.description && (
                <span className="task-item-description">{task.description}</span>
              )}
              <span className={`task-item-priority-badge priority-${task.priority}`}>
                {task.priority}
              </span>
            </div>
          </div>
          <div className="task-item-actions">
            <button
              type="button"
              className="task-item-btn toggle-completion"
              onClick={() => onToggle(task.id)}
            >
              {task.completed ? 'Mark incomplete' : 'Mark complete'}
            </button>
            <button
              type="button"
              className="task-item-btn edit"
              onClick={() => onSetEditing(task.id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="task-item-btn delete"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
          {showDeleteConfirm && (
            <div className="task-item-delete-confirm">
              <span>Delete this task?</span>
              <button type="button" className="confirm-yes" onClick={handleConfirmDelete}>
                Yes
              </button>
              <button type="button" className="confirm-no" onClick={handleCancelDelete}>
                No
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TaskItem;
