import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * Settings Page
 * User settings for appearance and account management
 */
export default function Settings() {
  // ========== STATE & CONTEXT ==========
  const { theme, setTheme } = useApp();

  // ========== RENDER ==========
  return (
    <div className="page narrow">
      <h1>Settings</h1>

      {/* Appearance Setting */}
      <div className="setting">
        <div>
          <b>Appearance</b>
          <small>
            Switch between a comfortable light and dark interface.
          </small>
        </div>
        <button
          className="outline"
          onClick={() =>
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }
        >
          {theme === 'dark' ? 'Light' : 'Dark'} mode
        </button>
      </div>

      {/* Account Setting */}
      <div className="setting">
        <div>
          <b>Account</b>
          <small>
            Your posts, profile and social activity are stored
            locally in this demo.
          </small>
        </div>
        <Link className="outline" to="/logout">
          Log out
        </Link>
      </div>
    </div>
  );
}
