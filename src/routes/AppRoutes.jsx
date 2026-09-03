import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import Create from '../pages/Create';
import EditProfile from '../pages/EditProfile';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Profile from '../pages/Profile';
import Saved from '../pages/Saved';
import Search from '../pages/Search';
import Settings from '../pages/Settings';

function ProtectedRoute() {
  const { isAuthenticated } = useApp();

  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create" element={<Create />} />
      </Route>
    </Routes>
  );
}
