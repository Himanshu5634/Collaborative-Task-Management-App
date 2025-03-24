import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState(""); // State to store the user's name
  const [email, setEmail] = useState(""); // State to store the user's email
  const [password, setPassword] = useState(""); // State to store the user's password
  const navigate = useNavigate(); // React Router's navigation function

  /**
   * Handles the form submission for registration.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("Email already registered!");
    } else {
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please log in.");
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
};

export default Register;
