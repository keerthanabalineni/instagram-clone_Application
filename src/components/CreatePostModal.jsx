import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

/**
 * CreatePostModal Component
 * Modal for creating new posts or stories with image upload and captions
 */
export default function CreatePostModal({ close, story = false }) {
  // ========== STATE & CONTEXT ==========
  const { addPost, addStory } = useApp();
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  // ========== HANDLERS ==========
  /**
   * Handle file upload and convert to data URL
   */
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = e => {
    e.preventDefault();
    
    if (!image) return;

    if (story) {
      addStory({ image });
    } else {
      addPost({ image, caption, location });
    }
    
    close();
  };

  // ========== RENDER ==========
  return (
    <div className="modal-backdrop">
      <form className="create-modal" onSubmit={handleSubmit}>
        {/* Modal Header */}
        <div className="modal-title">
          <h2>
            {story ? 'Add to your story' : 'Create new post'}
          </h2>
          <button type="button" onClick={close}>
            ×
          </button>
        </div>

        {/* Image Upload */}
        <label className="upload-box">
          {image ? (
            <img src={image} alt="preview" />
          ) : (
            <>
              <strong>Choose a photo</strong>
              <span>Use a real photo from your device</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {/* Post-only Fields */}
        {!story && (
          <>
            <input
              className="field"
              placeholder="Write a caption..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />
            <input
              className="field"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </>
        )}

        {/* Submit Button */}
        <button className="primary" disabled={!image}>
          {story ? 'Share story' : 'Share post'}
        </button>
      </form>
    </div>
  );
}
