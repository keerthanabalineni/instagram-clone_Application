import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';

/**
 * Search Page
 * Lets users search for people and posts
 */
export default function Search() {
  // ========== STATE & CONTEXT ==========
  const { users, posts, toggleFollow } = useApp();
  const [query, setQuery] = useState('');

  // ========== DERIVED STATE ==========
  // Filter users by username or name
  const filteredUsers = useMemo(
    () =>
      users.filter(u =>
        `${u.username} ${u.name}`.toLowerCase().includes(
          query.toLowerCase()
        )
      ),
    [users, query]
  );

  // Filter posts by caption
  const filteredPosts = posts.filter(p =>
    p.caption.toLowerCase().includes(query.toLowerCase())
  );

  // ========== RENDER ==========
  return (
    <div className="page">
      <h1>Search</h1>

      {/* Search Input */}
      <input
        className="search-box"
        placeholder="Search people or posts"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {/* People Section */}
      <h3>People</h3>
      <div className="search-users">
        {filteredUsers.map(u => (
          <div key={u.id}>
            <img src={u.avatar} alt="" />
            <span>
              <b>{u.username}</b>
              <small>{u.name}</small>
            </span>
            <button onClick={() => toggleFollow(u.username)}>
              {u.following ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <h3>Posts</h3>
      <div className="search-grid">
        {filteredPosts.map(p => (
          <img key={p.id} src={p.image} alt={p.caption} />
        ))}
      </div>
    </div>
  );
}
