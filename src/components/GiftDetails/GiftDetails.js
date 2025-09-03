// src/components/GiftDetails/GiftDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../../api";

export default function GiftDetails() {
  const { id } = useParams();
  const [gift, setGift] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/gifts/${id}`);
        if (res.ok) setGift(await res.json());
        else setGift(null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!gift) return <p style={{ padding: 16 }}>Loading or gift not found.</p>;
  return (
    <div style={{ padding: 16 }}>
      <h1>{gift.name}</h1>
      <p>Category: {gift.category}</p>
      <p>Price: ${gift.price}</p>
    </div>
  );
}
