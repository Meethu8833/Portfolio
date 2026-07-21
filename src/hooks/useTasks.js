/* ---------------------------------------------------------------------------
   useTasks — encapsulates task-list state + the CRUD actions a component needs.

   Components render `tasks` and call add/toggle/remove; all the data-fetching
   detail is delegated to services/taskService.js. This keeps components dumb
   and makes the fetching logic reusable + testable.

   Business logic is stubbed — implement in a later phase.
--------------------------------------------------------------------------- */

import { useCallback, useState } from 'react';
import * as taskService from '../services/taskService.js';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all tasks (call from an effect in the consuming component/page).
  const loadTasks = useCallback(async () => {
    // TODO: setLoading(true); setTasks(await taskService.getTasks()); setLoading(false);
  }, []);

  const addTask = useCallback(async (payload) => {
    // TODO: const created = await taskService.createTask(payload);
    //       setTasks((prev) => [...prev, created]);
  }, []);

  const toggleTask = useCallback(async (id, done) => {
    // TODO: await taskService.updateTask(id, { done }); update local state
  }, []);

  const removeTask = useCallback(async (id) => {
    // TODO: await taskService.deleteTask(id);
    //       setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, loading, error, loadTasks, addTask, toggleTask, removeTask };
}

export default useTasks;
