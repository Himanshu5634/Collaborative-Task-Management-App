import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [], // List of tasks, loaded from localStorage
  filterStatus: "All", // Current filter status for tasks (e.g., "All", "Completed", "Pending")
  sortBy: "createdAt", // Current sorting criteria for tasks
};

/**
 * Redux slice for task management.
 * Manages adding, updating, deleting, filtering, and sorting tasks.
 */
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /**
     * Adds a new task to the state and saves it to localStorage.
     *
     * @param {Object} state - The current state of the task slice.
     * @param {Object} action - The dispatched action containing the payload.
     * @param {Object} action.payload - The task data to be added.
     */
    addTask: (state, action) => {
      const newTask = { ...action.payload, createdAt: new Date().toISOString() };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    /**
     * Updates an existing task in the state and saves the changes to localStorage.
     *
     * @param {Object} state - The current state of the task slice.
     * @param {Object} action - The dispatched action containing the payload.
     * @param {Object} action.payload - The updated task data, including the task ID.
     */
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },

    /**
     * Deletes a task from the state and removes it from localStorage.
     *
     * @param {Object} state - The current state of the task slice.
     * @param {Object} action - The dispatched action containing the payload.
     * @param {string} action.payload - The ID of the task to be deleted.
     */
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    /**
     * Sets the filter status for tasks (e.g., "All", "Completed", "Pending").
     *
     * @param {Object} state - The current state of the task slice.
     * @param {Object} action - The dispatched action containing the payload.
     * @param {string} action.payload - The new filter status.
     */
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    /**
     * Sets the sorting criteria for tasks (e.g., "createdAt", "dueDate").
     *
     * @param {Object} state - The current state of the task slice.
     * @param {Object} action - The dispatched action containing the payload.
     * @param {string} action.payload - The new sorting criteria.
     */
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setFilterStatus, setSortBy } = taskSlice.actions;
export default taskSlice.reducer;
