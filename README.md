# InstaClone v2.1

A polished Instagram-inspired React + Vite frontend built as a modular interview project.

## Features
- Responsive feed and stories
- Create posts and stories with local image uploads
- New posts automatically appear in Feed and Profile
- Edit/delete your own posts
- Likes, comments and saves
- Editable profile with profile-photo upload
- Search users/posts and follow/unfollow
- Notifications, saved posts and settings
- Light/dark mode
- LocalStorage persistence
- Natural-looking Unsplash photography for seed content

## Run
```bash
npm install
npm run dev
```

## Folder structure
```text
src/
├── components/   # Reusable UI
├── pages/        # Route-level screens
├── context/      # Shared app state
├── data/         # Seed users, posts and stories
├── utils/        # LocalStorage helpers
├── App.jsx
├── main.jsx
└── index.css
```

This is intentionally frontend-only so it can be demonstrated without a backend. For production, replace LocalStorage and image URLs with a real API/database and storage service.
