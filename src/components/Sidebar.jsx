import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * Sidebar Component
 * Main navigation sidebar with brand logo, menu items, theme toggle, and profile
 */
export default function Sidebar() {
  // ========== STATE & CONTEXT ==========
  const { profile, theme, setTheme } = useApp();

  // ========== NAVIGATION ITEMS ==========
  const navItems = [
    ['⌂', 'Home', '/'],
    ['⌕', 'Search', '/search'],
    ['＋', 'Create', '/create'],
    ['▣', 'Saved', '/saved'],
    ['◉', 'Profile', '/profile'],
    ['⚙', 'Settings', '/settings'],
  ];

  // ========== HELPERS ==========
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const themeLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';
  const themeIcon = theme === 'dark' ? '☀' : '☾';

  // ========== RENDER ==========
  return (
    <aside className="sidebar">
      {/* Brand Logo */}
      <div className="brand">
        insta<span>•</span>
      </div>

      {/* Main Navigation */}
      <nav>
        {navItems.map(([icon, label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <b>{icon}</b>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Theme Toggle Button */}
      <button className="theme-btn" onClick={toggleTheme}>
        {themeIcon} {themeLabel}
      </button>

      {/* Current User Profile */}
      <NavLink className="side-profile" to="/profile">
        <img src={profile.avatar} alt="" />
        <span>
          <b>{profile.username}</b>
          <small>{profile.name}</small>
        </span>
      </NavLink>
    </aside>
  );
}
