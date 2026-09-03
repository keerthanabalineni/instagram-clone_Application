import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CreatePostModal from '../components/CreatePostModal';

/**
 * Profile Page Component
 * Displays user profile information, posts grid, and suggested users
 */
export default function Profile() {
  // ========== STATE & CONTEXT ==========
  const { profile, posts, users, toggleFollow } = useApp();
  const [create, setCreate] = useState(false);

  // ========== DERIVED STATE ==========
  const mine = posts.filter(p => p.user === profile.username);

  // ========== RENDER ==========
  return (
    <div className="page">
      {/* Profile Header Section */}
      <header className="profile-head">
        <img className="profile-avatar" src={profile.avatar} alt="" />
        
        <div className="profile-info">
          {/* Profile Title & Action Buttons */}
          <div className="profile-title">
            <h1>{profile.username}</h1>
            <Link className="outline" to="/profile/edit">
              Edit profile
            </Link>
            <button className="outline" onClick={() => setCreate(true)}>
              ＋ Post
            </button>
          </div>

          {/* Profile Stats */}
          <div className="stats">
            <span>
              <b>{mine.length}</b> posts
            </span>
            <span>
              <b>1.2K</b> followers
            </span>
            <span>
              <b>384</b> following
            </span>
          </div>

          {/* Profile Bio Information */}
          <h3>{profile.name}</h3>
          <p>{profile.bio}</p>
          <a href={`https://${profile.website}`} target="_blank">
            {profile.website}
          </a>
          <small>⌖ {profile.location}</small>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="tabs">
        <span className="selected">▦ Posts</span>
        <Link to="/saved">▣ Saved</Link>
      </div>

      {/* Posts Grid or Empty State */}
      {mine.length ? (
        <div className="profile-grid">
          {mine.map(p => (
            <img key={p.id} src={p.image} alt={p.caption} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Share your first photo</h2>
          <p>When you share a photo, it will appear on your profile.</p>
          <button className="primary small" onClick={() => setCreate(true)}>
            Create post
          </button>
        </div>
      )}

      {/* Create Post Modal */}
      {create && <CreatePostModal close={() => setCreate(false)} />}

      {/* Suggested Users Section */}
      <div className="people-row">
        {users.slice(0, 3).map(u => (
          <button
            key={u.id}
            onClick={() => toggleFollow(u.username)}
          >
            {u.following ? 'Following' : 'Follow'} @{u.username}
          </button>
        ))}
      </div>
    </div>
  );
}
