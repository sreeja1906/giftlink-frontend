// src/components/MainPage/MainPage.js
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../api";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/gifts`);
        const data = await res.json();
        setGifts(data);
      } catch (err) {
        console.error("Fetch gifts error:", err);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>All Gifts</h1>
      <ul>
        {gifts.map(g => (
          <li key={g._id}>
            <Link to={`/gift/${g._id}`}>{g.name}</Link> — {g.category} — ${g.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
