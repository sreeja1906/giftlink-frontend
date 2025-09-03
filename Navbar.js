// src/components/Navbar/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const raw = localStorage.getItem("giftlink_user");
  const user = raw ? JSON.parse(raw) : null;

  const logout = () => {
    localStorage.removeItem("giftlink_user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link> | <Link to="/search">Search</Link>
      <span style={{ float: "right" }}>
        {user ? (
          <>
            Hello, {user.username} <button onClick={logout}>Logout</button>
          </>
        ) : (
          "Not logged in"
        )}
      </span>
    </nav>
  );
}
