import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";


const Navbar = () => {
  const { user } = useSelector((state) => state.auth); // Retrieves the logged-in user from the Redux store
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // React Router's navigation function
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle the dropdown menu

  /**
   * Handles the logout action.
   * Dispatches the logout action and navigates the user to the login page.
   */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Task Manager</h2>
      <div className="nav-links">
        {user ? (
          <div className="profile-container">
            <FaUserCircle
              className="profile-icon"
              size={30}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown">
                <p>{user.name}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
