import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState(""); // State to store the user's email
  const [password, setPassword] = useState(""); // State to store the user's password
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // React Router's navigation function

  /**
   * Handles the form submission for login.
   * Validates the user's credentials against stored users in localStorage.
   * Dispatches the login action and navigates to the dashboard if successful.
   * Displays an alert if the credentials are invalid.
   *
   * @param {FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find((user) => user.email === email && user.password === password);

    if (existingUser) {
      dispatch(login(existingUser));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
};

export default Login;
