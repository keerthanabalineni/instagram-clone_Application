import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

/**
 * Layout Component
 * Main layout wrapper with sidebar, main content area, and mobile navigation
 */
export default function Layout() {
  // ========== STATE & CONTEXT ==========
  const { theme } = useApp();

  // ========== EFFECTS ==========
  // Update theme on root element whenever theme changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // ========== RENDER ==========
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}
