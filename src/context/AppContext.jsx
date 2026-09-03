import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  currentUser,
  users,
  posts as seedPosts,
  stories as seedStories,
} from '../data/initialData';
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/auth';
import { load, save } from '../utils/storage';

/**
 * App Context
 * Global state management for authentication, posts, users, and settings
 */
const AppContext = createContext(null);

// ========== HELPER FUNCTIONS ==========
/**
 * Load user-specific content (posts, stories) with fallback
 */
const loadUserContent = (key, legacyKey, fallback) => {
  const stored = localStorage.getItem(key);
  if (stored) return load(key, fallback);
  return load(legacyKey, []).filter(item => item.mine);
};

/**
 * Load and deduplicate stories from multiple sources
 */
const loadStories = () => {
  const stored = load('ic_user_stories', []);
  const saved = Array.isArray(stored) ? stored : [];
  const legacy = load('ic_stories', []).filter(item => item.mine);

  return [
    ...seedStories,
    ...saved,
    ...legacy,
  ].filter(
    (story, index, all) =>
      all.findIndex(item => item.id === story.id) === index
  );
};

/**
 * AppProvider Component
 * Provides global app state to all components
 */
export function AppProvider({ children }) {
  // ========== STATE ==========
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    load('ic_authenticated', false)
  );
  const [profile, setProfile] = useState(() =>
    load('ic_profile', currentUser)
  );
  const [posts, setPosts] = useState(() =>
    loadUserContent('ic_user_posts', 'ic_posts', seedPosts)
  );
  const [usersState, setUsers] = useState(() =>
    load('ic_users', users)
  );
  const [stories, setStories] = useState(loadStories);
  const [theme, setTheme] = useState(() =>
    load('ic_theme', 'dark')
  );

  // ========== EFFECTS: PERSIST STATE ==========
  useEffect(() => save('ic_authenticated', isAuthenticated), [
    isAuthenticated,
  ]);
  useEffect(() => save('ic_profile', profile), [profile]);
  useEffect(() => save('ic_user_posts', posts), [posts]);
  useEffect(() => save('ic_users', usersState), [usersState]);
  useEffect(() => save('ic_user_stories', stories), [stories]);
  useEffect(() => save('ic_theme', theme), [theme]);

  // ========== ACTIONS: AUTHENTICATION ==========
  const login = (username, password) => {
    if (
      username === DEFAULT_USERNAME &&
      password === DEFAULT_PASSWORD
    ) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  // ========== ACTIONS: POSTS ==========
  const toggleLike = id =>
    setPosts(p =>
      p.map(x =>
        x.id === id
          ? {
              ...x,
              liked: !x.liked,
              likes: x.likes + (x.liked ? -1 : 1),
            }
          : x
      )
    );

  const toggleSave = id =>
    setPosts(p =>
      p.map(x =>
        x.id === id ? { ...x, saved: !x.saved } : x
      )
    );

  const addComment = (id, text) => {
    if (!text.trim()) return;
    setPosts(p =>
      p.map(x =>
        x.id === id
          ? {
              ...x,
              comments: [
                ...x.comments,
                { user: profile.username, text: text.trim() },
              ],
            }
          : x
      )
    );
  };

  const addPost = ({ image, caption, location }) => {
    const post = {
      id: `p-${Date.now()}`,
      user: profile.username,
      name: profile.name,
      avatar: profile.avatar,
      image,
      caption,
      location,
      likes: 0,
      liked: false,
      saved: false,
      comments: [],
      created: 'now',
      mine: true,
    };
    setPosts(p => [post, ...p]);
  };

  const updatePost = (id, caption) =>
    setPosts(p =>
      p.map(x =>
        x.id === id && x.user === profile.username
          ? { ...x, caption }
          : x
      )
    );

  const deletePost = id => setPosts(p => p.filter(x => x.id !== id));

  // ========== ACTIONS: PROFILE ==========
  const updateProfile = next => setProfile(p => ({ ...p, ...next }));

  // ========== ACTIONS: USERS ==========
  const toggleFollow = username =>
    setUsers(u =>
      u.map(x =>
        x.username === username
          ? { ...x, following: !x.following }
          : x
      )
    );

  // ========== ACTIONS: STORIES ==========
  const addStory = ({ image }) =>
    setStories(s => [
      {
        id: `s-${Date.now()}`,
        username: profile.username,
        avatar: profile.avatar,
        image,
        time: 'now',
        mine: true,
      },
      ...s,
    ]);

  // ========== CONTEXT VALUE ==========
  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      profile,
      posts,
      users: usersState,
      stories,
      theme,
      setTheme,
      toggleLike,
      toggleSave,
      addComment,
      addPost,
      updatePost,
      deletePost,
      updateProfile,
      toggleFollow,
      addStory,
    }),
    [isAuthenticated, profile, posts, usersState, stories, theme]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Hook to use App context
 */
export const useApp = () => useContext(AppContext);
