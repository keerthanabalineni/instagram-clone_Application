import React, { useState } from 'react';
import CreatePostModal from '../components/CreatePostModal';

/**
 * Create Page
 * Lets users choose between creating a post or a story
 */
export default function Create() {
  // ========== STATE ==========
  const [isStory, setIsStory] = useState(false);

  // ========== HANDLERS ==========
  const handleClose = () => {
    window.history.back();
  };

  // ========== RENDER ==========
  return (
    <div className="page create-page">
      <h1>Create</h1>
      <p>Choose what you want to share with your followers.</p>

      {/* Create Options */}
      <div className="create-cards">
        <button onClick={() => setIsStory(false)}>
          <strong>＋</strong>
          <b>New post</b>
          <span>Share a photo with a caption.</span>
        </button>
        <button onClick={() => setIsStory(true)}>
          <strong>◌</strong>
          <b>New story</b>
          <span>Share a photo that feels like now.</span>
        </button>
      </div>

      {/* Create Modal */}
      <CreatePostModal close={handleClose} story={isStory} />
    </div>
  );
}
