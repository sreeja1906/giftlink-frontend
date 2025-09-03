// src/components/RegisterPage/RegisterPage.js
import React, { useState } from "react";
import { API_BASE } from "../../api";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMsg(res.status === 201 ? "Registered" : (data.message || res.statusText));
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} /><br/>
        <input name="username" placeholder="Username" value={form.username} onChange={onChange} /><br/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} /><br/>
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
