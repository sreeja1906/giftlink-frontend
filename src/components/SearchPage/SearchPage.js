// src/components/SearchPage/SearchPage.js
import React, { useState } from "react";
import { API_BASE } from "../../api";

export default function SearchPage() {
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);

  const onSearch = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/gifts/search?category=${encodeURIComponent(category)}`);
      setResults(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Search Gifts</h1>
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="flowers, books, ..." />
      <button onClick={onSearch}>Search</button>
      <ul>
        {results.map(g => <li key={g._id}>{g.name} — {g.category} — ${g.price}</li>)}
      </ul>
    </div>
  );
}
