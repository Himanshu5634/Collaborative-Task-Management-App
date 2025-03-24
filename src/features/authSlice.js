import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

/**
 * Redux slice for authentication.
 * Manages user registration, login, and logout functionality.
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser, // The currently logged-in user, or null if no user is logged in
  },
  reducers: {
    /**
     * Registers a new user.
     * Checks if the user already exists, and if not, adds the user to localStorage and sets the user in the state.
     *
     * @param {Object} state - The current state of the auth slice.
     * @param {Object} action - The dispatched action containing the payload.
     * 
     */
    register: (state, action) => {
      const { name, email, password } = action.payload;

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((user) => user.email === email)) {
        alert("User already exists!");
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));

      state.user = newUser;
    },

    /**
     * Logs in an existing user.
     * Validates the user's credentials and sets the user in the state if valid.
     *
     * @param {Object} state - The current state of the auth slice.
     * @param {Object} action - The dispatched action containing the payload.
     * 
     */
    login: (state, action) => {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const existingUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (existingUser) {
        localStorage.setItem("user", JSON.stringify(existingUser));
        state.user = existingUser;
      } else {
        alert("Invalid credentials!");
      }
    },

    /**
     * Logs out the current user.
     * Removes the user from localStorage and resets the user in the state to null.
     *
     * @param {Object} state - The current state of the auth slice.
     */
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
