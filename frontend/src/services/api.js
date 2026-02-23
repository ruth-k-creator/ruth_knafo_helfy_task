const API_BASE = 'http://localhost:4000/api/tasks';

export async function getTasks() {
  const res = await fetch(API_BASE);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error  || 'Request failed');
  return data;
}

export async function createTask(task) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error  || 'Request failed');
  return data;
}

export async function updateTask(id, task) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function toggleTask(id) {
  const res = await fetch(`${API_BASE}/${id}/toggle`, { method: 'PATCH' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}