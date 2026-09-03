import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/auth';
import { useApp } from '../context/AppContext';

/**
 * Login Page
 * Handles user authentication with demo credentials
 */
export default function Login() {
  const { isAuthenticated, login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = e => {
    e.preventDefault();

    if (login(username.trim(), password)) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
      return;
    }

    setError('Incorrect username or password.');
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-brand">
          insta<span>•</span>
        </div>

        <h1>Welcome back</h1>
        <p className="auth-muted">Sign in to continue to your feed.</p>

        <label>
          Username
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button className="primary full" type="submit">
          Log in
        </button>

        <div className="auth-demo">
          <b>Demo account</b>
          <span>Username: {DEFAULT_USERNAME}</span>
          <span>Password: {DEFAULT_PASSWORD}</span>
        </div>
      </form>
    </main>
  );
}
