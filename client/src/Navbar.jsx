import React, { useContext } from "react";
import "./Style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userContext } from "./App";
import axios from "axios";

function Navbar() {
  const user = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        if (res.data === "Success") navigate(0);
      })
      .catch((err) => console.log(err));
  };

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  if (isLoginPage || isRegisterPage) {
    return null;
  }

  return (
    <div className="navbar-header">
      <div>
        <h3>Bloggy</h3>
      </div>
      <div>
        <Link to="/" className="link">
          Home
        </Link>
        {user.username ? (
          <Link to="/create" className="link">
            Create
          </Link>
        ) : (
          <></>
        )}
      </div>
      {user.username ? (
        <div>
          <input
            type="button"
            onClick={handleLogout}
            value="Logout"
            className="btn_input"
          />
        </div>
      ) : (
        <div>
          <button className="link-btn">
            <Link to="/register" className="link">
              Register
            </Link>
          </button>
          <button className="link-btn">
            <Link to="/login" className="link">
              Login
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
