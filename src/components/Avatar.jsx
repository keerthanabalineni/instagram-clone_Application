import React from 'react';

/**
 * Avatar Component
 * Displays a circular profile picture with optional interactivity
 */
export default function Avatar({
  src,
  name = '',
  size = 'md',
  story = false,
  onClick,
}) {
  // Determine if wrapper is a clickable button or static span
  const Wrapper = onClick ? 'button' : 'span';

  return (
    <Wrapper
      className={`avatar avatar-${size} ${story ? 'avatar-story' : ''}`}
      onClick={onClick}
      aria-label={name || 'profile'}
    >
      <img src={src} alt={name} />
    </Wrapper>
  );
}
