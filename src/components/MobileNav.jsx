import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * MobileNav Component
 * Mobile-only navigation bar with icon links
 */
export default function MobileNav() {
  // ========== NAVIGATION ITEMS ==========
  const navItems = [
    ['⌂', '/'],         // Home
    ['⌕', '/search'],   // Search
    ['＋', '/create'],   // Create
    ['◉', '/profile'],   // Profile
  ];

  // ========== RENDER ==========
  return (
    <nav className="mobile-nav">
      {navItems.map(([icon, path]) => (
        <NavLink key={path} to={path}>
          {icon}
        </NavLink>
      ))}
    </nav>
  );
}
