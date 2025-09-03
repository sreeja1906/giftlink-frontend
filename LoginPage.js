// src/components/LoginPage/LoginPage.js
import React, { useState } from "react";
import { API_BASE } from "../../api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer demo-token"
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.user) {
        localStorage.setItem("giftlink_user", JSON.stringify(data.user));
        setMsg("Login successful");
        navigate("/");
        window.location.reload();
      } else {
        setMsg(data.message || "Login failed");
      }
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} /><br/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} /><br/>
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
