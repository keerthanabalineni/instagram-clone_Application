import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Stories from '../components/Stories';
import PostCard from '../components/PostCard';
import StoryViewer from '../components/StoryViewer';
import CreatePostModal from '../components/CreatePostModal';

/**
 * Home Page
 * Main feed with stories, posts, and suggestions
 */
export default function Home() {
  // ========== STATE & CONTEXT ==========
  const { posts, users, toggleFollow } = useApp();
  const [story, setStory] = useState(null);
  const [create, setCreate] = useState(false);

  // ========== DERIVED STATE ==========
  // Get users not being followed (suggestions)
  const suggestions = users.filter(u => !u.following);

  // ========== RENDER ==========
  return (
    <>
      {/* Top Navigation Bar */}
      <header className="topbar">
        <div className="mobile-brand">
          insta<span>•</span>
        </div>
        <button className="new-post" onClick={() => setCreate(true)}>
          ＋ Create
        </button>
      </header>

      {/* Main Feed Layout */}
      <div className="feed-layout">
        {/* Left: Feed Section */}
        <section className="feed">
          {/* Stories */}
          <Stories onView={setStory} />

          {/* Posts or Empty State */}
          {posts.length ? (
            posts.map(p => <PostCard key={p.id} post={p} />)
          ) : (
            <div className="empty feed-empty">
              <h2>Your feed is waiting</h2>
              <p>Share your first photo to see it here.</p>
              <button
                className="primary small"
                onClick={() => setCreate(true)}
              >
                Create post
              </button>
            </div>
          )}
        </section>

        {/* Right: Sidebar Suggestions */}
        <aside className="right-panel">
          {/* Suggestions Header */}
          <div className="profile-mini">
            <img src={users[0].avatar} alt="" />
            <div>
              <b>Suggestions for you</b>
              <small>People you may know</small>
            </div>
          </div>

          {/* Suggestion Items */}
          {suggestions.map(u => (
            <div className="suggestion" key={u.id}>
              <img src={u.avatar} alt="" />
              <span>
                <b>{u.username}</b>
                <small>{u.name}</small>
              </span>
              <button onClick={() => toggleFollow(u.username)}>
                Follow
              </button>
            </div>
          ))}
        </aside>
      </div>

      {/* Story Viewer Modal */}
      {story && (
        <StoryViewer story={story} onClose={() => setStory(null)} />
      )}

      {/* Create Post Modal */}
      {create && <CreatePostModal close={() => setCreate(false)} />}
    </>
  );
}
