/* ---------------------------------------------------------------------------
   Task service — business logic for the Todo/Task CRUD against FastAPI.

   Sits between the UI (useTasks) and the raw HTTP layer (api). This is where
   response mapping, optimistic-update helpers, and endpoint paths will live.
   Components call these functions; they never build task URLs themselves.
--------------------------------------------------------------------------- */

import { api } from './api.js';

/** GET /tasks → list all tasks for the current user. */
export async function getTasks() {
  // TODO: return api.get('/tasks');
  return Promise.resolve([]);
}

/** POST /tasks → create a task. `payload` = { title, description, ... }. */
export async function createTask(payload) {
  // TODO: return api.post('/tasks', payload);
  return Promise.reject(new Error('taskService.createTask not implemented'));
}

/** PATCH /tasks/:id → partial update (e.g. toggle done, edit title). */
export async function updateTask(id, changes) {
  // TODO: return api.patch(`/tasks/${id}`, changes);
  return Promise.reject(new Error('taskService.updateTask not implemented'));
}

/** DELETE /tasks/:id → remove a task. */
export async function deleteTask(id) {
  // TODO: return api.delete(`/tasks/${id}`);
  return Promise.reject(new Error('taskService.deleteTask not implemented'));
}

export default { getTasks, createTask, updateTask, deleteTask };
