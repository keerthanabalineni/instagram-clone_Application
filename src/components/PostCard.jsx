import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

/**
 * PostCard Component
 * Individual post card with image, likes, comments, and interactions
 */
export default function PostCard({ post }) {
  // ========== STATE & CONTEXT ==========
  const { profile, toggleLike, toggleSave, addComment, deletePost, updatePost } =
    useApp();
  const [comment, setComment] = useState('');
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(post.caption);

  // ========== DERIVED STATE ==========
  const isOwnPost = post.user === profile.username;

  // ========== HANDLERS ==========
  /**
   * Handle adding a new comment
   */
  const handleCommentSubmit = e => {
    e.preventDefault();
    addComment(post.id, comment);
    setComment('');
  };

  /**
   * Focus comment input field
   */
  const focusCommentInput = () => {
    document.getElementById(`comment-${post.id}`)?.focus();
  };

  /**
   * Save edited caption
   */
  const saveCaption = () => {
    updatePost(post.id, caption);
    setEditing(false);
  };

  // ========== RENDER ==========
  return (
    <article className="post-card">
      {/* Post Header */}
      <header>
        <img src={post.avatar} alt="" />
        <div>
          <b>{post.name}</b>
          <small>
            {post.location} · {post.created}
          </small>
        </div>

        {/* Post Menu (Owner Only) */}
        {isOwnPost && (
          <div className="post-menu">
            <button onClick={() => setEditing(!editing)}>•••</button>
            {editing && (
              <div className="menu-pop">
                <button onClick={saveCaption}>Save caption</button>
                <button onClick={() => deletePost(post.id)}>
                  Delete post
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Post Image */}
      <img className="post-image" src={post.image} alt={post.caption} />

      {/* Action Buttons */}
      <div className="post-actions">
        <button
          onClick={() => toggleLike(post.id)}
          className={post.liked ? 'liked' : ''}
        >
          ♥
        </button>
        <button onClick={focusCommentInput}>♡</button>
        <button onClick={() => toggleSave(post.id)} className="save">
          {post.saved ? '🔖' : '▢'}
        </button>
      </div>

      {/* Post Body */}
      <div className="post-body">
        {/* Like Count */}
        <b>{post.likes} likes</b>

        {/* Caption */}
        {editing ? (
          <div className="edit-caption">
            <input
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />
          </div>
        ) : (
          <p>
            <b>{post.user}</b> {post.caption}
          </p>
        )}

        {/* Comments */}
        <div className="comments">
          {post.comments.slice(-2).map((c, i) => (
            <p key={i}>
              <b>{c.user}</b> {c.text}
            </p>
          ))}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            id={`comment-${post.id}`}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button>Post</button>
        </form>
      </div>
    </article>
  );
}
