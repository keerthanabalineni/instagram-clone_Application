import React, { useEffect, useState } from 'react';

/**
 * StoryViewer Component
 * Full-screen story display with auto-play timer and progress bar
 */
export default function StoryViewer({ story, onClose }) {
  // ========== STATE ==========
  const [progress, setProgress] = useState(0);

  // ========== EFFECTS ==========
  // Auto-play story with progress timer (auto-closes at 100%)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          onClose();
          return 100;
        }
        return p + 2; // Increment progress
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onClose]);

  // ========== RENDER ==========
  return (
    <div className="story-overlay" onClick={onClose}>
      <div
        className="story-modal"
        onClick={e => e.stopPropagation()}
        style={{
          backgroundImage: `url(${story.image || story.avatar})`,
        }}
      >
        {/* Progress Bar */}
        <div className="story-progress">
          <i style={{ width: `${progress}%` }} />
        </div>

        {/* Story Header */}
        <div className="story-head">
          <img src={story.avatar} alt="" />
          <b>{story.username}</b>
          <span>{story.time || 'now'}</span>
          <button onClick={onClose}>×</button>
        </div>

        {/* Empty State */}
        {!story.image && (
          <div className="story-empty">
            Share a moment with your followers.
          </div>
        )}
      </div>
    </div>
  );
}
