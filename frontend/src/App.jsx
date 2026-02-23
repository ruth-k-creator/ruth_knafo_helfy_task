import { useState, useEffect, useCallback } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import './styles/App.css';

const FILTER_ALL = 'all';
const FILTER_COMPLETED = 'completed';
const FILTER_PENDING = 'pending';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(FILTER_ALL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = tasks.filter((t) => {
    if (filter === FILTER_COMPLETED) return t.completed;
    if (filter === FILTER_PENDING) return !t.completed;
    return true;
  });

  const handleCreate = async (task) => {
    setError(null);
    try {
      const created = await createTask(task);
      setTasks((prev) => [...prev, created]);
    } catch (err) {
      setError(err.message || 'Failed to create task');
      throw err;
    }
  };

  const handleUpdate = async (id, updates) => {
    setError(null);
    try {
      const updated = await updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingId(null);
    } catch (err) {
      setError(err.message || 'Failed to update task');
      throw err;
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (editingId === id) setEditingId(null);
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleToggle = async (id) => {
    setError(null);
    try {
      const updated = await toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message || 'Failed to toggle task');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <TaskFilter filter={filter} onFilterChange={setFilter} />

      <TaskForm onSubmit={handleCreate} />

      {error && (
        <div className="app-error" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="app-loading">Loading tasks…</div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={handleUpdate}
          onDelete={handleDelete}
          onToggle={handleToggle}
          editingId={editingId}
          onSetEditingId={setEditingId}
        />
      )}
    </div>
  );
}

export default App;
