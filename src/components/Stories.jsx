import React from 'react';
import { useApp } from '../context/AppContext';
import Avatar from './Avatar';

/**
 * Stories Component
 * Displays user stories in a horizontal scrollable section
 */
export default function Stories({ onView }) {
  // ========== STATE & CONTEXT ==========
  const { stories, profile } = useApp();

  // ========== HANDLERS ==========
  const viewOwnStory = () => {
    onView({
      username: profile.username,
      avatar: profile.avatar,
      image: null,
      mine: true,
    });
  };

  // ========== RENDER ==========
  return (
    <section className="stories">
      {/* Add Story Button */}
      <button className="story-add" onClick={viewOwnStory}>
        <Avatar src={profile.avatar} name="Your story" />
        <span className="plus">+</span>
        <small>Your story</small>
      </button>

      {/* Stories List */}
      {stories.map(s => (
        <button
          className="story"
          key={s.id}
          onClick={() => onView(s)}
        >
          <Avatar src={s.avatar} name={s.username} story />
          <small>{s.username}</small>
        </button>
      ))}
    </section>
  );
}
