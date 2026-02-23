# Task Manager

A simple todo app. You can add tasks, edit them, mark them done, and delete them. There is a filter for all / pending / completed and a carousel to swipe through tasks.

---

## Setup and installation

You need **Node.js** on your computer (I used something like v18 or v20).

1. Clone or download this repo and open the folder in terminal.

2. Install backend:
   - Go into the `backend` folder: `cd backend`
   - Run: `npm install`
   - Go back: `cd ..`

3. Install frontend:
   - Go into the `frontend` folder: `cd frontend`
   - Run: `npm install`

That’s it. No database or env file, everything is in memory.

---

## How to run

You need to run **both** the backend and the frontend (two terminals).

**Terminal 1 – Backend**

```bash
cd backend
npm run dev
```

Backend will run on http://localhost:4000. You should see something like “Server running on http://localhost:4000”.

**Terminal 2 – Frontend**

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5173.

---

## API documentation

Base URL: `http://localhost:4000/api/tasks`

All responses are JSON. When something goes wrong you get an object with an `error` field (and sometimes `details` with a list of messages).

### Get all tasks

- **GET** `/api/tasks`
- Returns an array of tasks.

### Create a task

- **POST** `/api/tasks`
- Body: `{ "title": "string", "description": "string (optional)", "priority": "low" | "medium" | "high" (optional, default medium) }`
- Title is required and must not be empty. Returns the new task with `id`, `completed: false`, `createdAt`, etc.

### Update a task

- **PUT** `/api/tasks/:id`
- Body: same as create. Returns the updated task.

### Delete a task

- **DELETE** `/api/tasks/:id`
- Returns 204 with no body.

### Toggle completion

- **PATCH** `/api/tasks/:id/toggle`
- No body. Flips `completed` (true ↔ false). Returns the updated task.

**Task object shape:** `id`, `title`, `description`, `priority`, `completed`, `createdAt`.

---

## Assumptions and design decisions

- **No database:** Tasks are stored in memory in the backend. Restart the server and they’re gone. Kept it simple for this project.
- **Frontend proxy:** Vite is set up to proxy `/api` to `localhost:4000`, so the frontend uses `/api/tasks` and doesn’t need to know the backend port.
- **Full update only in practice:** The API allows partial update on PUT, but the UI always sends the full task when you edit. So we only really support “replace whole task” from the app.
- **Carousel:** Task list is shown as a carousel (one task at a time, prev/next). List is duplicated so you can loop from last to first and first to last.
- **Filter:** Filter is only in the frontend. We get all tasks from the API and filter by completed/pending in the client.

---

## Time spent on each part

Rough idea of how long each part took (not exact):

| Part | Time |
|------|------|
| Backend API| ~45 min |
| Frontend setup | ~30 min |
| Task form , API calls from frontend | ~45 min |
| Task list + carousel  | ~45 min |
| Task item  | ~30 min |
| Filter  | ~15 min |
| Styling and responsive | ~30 min |
| README and small fixes | ~15 min |

Total about 4 hours.
