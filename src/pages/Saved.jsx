import React from 'react';
import { useApp } from '../context/AppContext';

/**
 * Saved Page
 * Displays all saved posts in a grid layout
 */
export default function Saved() {
  // ========== STATE & CONTEXT ==========
  const { posts } = useApp();

  // ========== DERIVED STATE ==========
  const saved = posts.filter(p => p.saved);

  // ========== RENDER ==========
  return (
    <div className="page">
      <h1>Saved</h1>

      {saved.length ? (
        <div className="profile-grid">
          {saved.map(p => (
            <img key={p.id} src={p.image} alt={p.caption} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nothing saved yet</h2>
          <p>Save posts you want to come back to.</p>
        </div>
      )}
    </div>
  );
}
