import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * Logout Page
 * Logs out the user and displays confirmation message
 */
export default function Logout() {
  // ========== STATE & CONTEXT ==========
  const { logout } = useApp();

  // ========== EFFECTS ==========
  // Trigger logout on component mount
  useEffect(() => logout(), [logout]);

  // ========== RENDER ==========
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          insta<span>•</span>
        </div>
        <h1>You are logged out</h1>
        <p className="auth-muted">
          Your local session has been ended.
        </p>
        <Link className="primary full auth-link" to="/login">
          Log in again
        </Link>
      </section>
    </main>
  );
}
