# Rogāre Frontend — File Structure

```
frontend/
├── .gitignore
├── README.md
├── context.md                  # Local convention notes for frontend work
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx                 # Root component with router
│   ├── main.jsx                # Entry point
│   ├── index.css              # Global styles
│   ├── api/
│   │   ├── README.md
│   │   └── axios.jsx          # Axios instance with interceptors
│   ├── assets/
│   │   ├── hero.png
│   │   ├── lab-support.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/            # Shared/reusable components (folder-per-component)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── README.md
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── README.md
│   │   └── Modal/
│   │       └── Modal.tsx
│   ├── pages/
│   │   ├── landing/            # Public landing page
│   │   │   ├── index.jsx
│   │   │   ├── service.jsx
│   │   │   ├── components/
│   │   │   │   └── FaqCard.jsx
│   │   │   └── LoginModal/
│   │   │       ├── index.jsx
│   │   │       └── service.jsx
│   │   ├── admin/              # Admin dashboard
│   │   │   └── index.jsx
│   │   └── user/              # Authenticated student section (nested routes)
│   │       ├── index.jsx      # Route shell — nested routes via React Router
│   │       ├── layout.jsx     # Shared layout — Header + LeftPane + <Outlet>
│   │       ├── constants.js   # Shared static data (STATUS_CONFIG, SEARCH_CATEGORIES, etc.)
│   │       ├── service.js     # Shared API calls (fetchQuestions, voteQuestion, etc.)
│   │       ├── components/    # Shared user-section components only
│   │       │   ├── Header/
│   │       │   │   ├── DashboardHeader.jsx
│   │       │   │   └── README.md
│   │       │   └── LeftPane/
│   │       │       ├── LeftPane.jsx
│   │       │       └── README.md
│   │       └── pages/        # Page-level views (each in its own folder)
│   │           ├── Dashboard/
│   │           │   └── index.jsx
│   │           ├── RaiseQuery/
│   │           │   └── index.jsx
│   │           ├── QueryDetail/
│   │           │   └── index.jsx
│   │           └── ProfileSettings/
│   │               └── index.jsx
│   ├── routes/
│   │   ├── index.jsx          # Route definitions
│   │   └── ProtectedRoute.jsx # Auth guard component
│   └── store/
│       └── useAuthStore.js    # Zustand auth state store
```

## Conventions

- **Folder-per-component** — each component lives in its own folder; direct file import (no `index.tsx` barrel for single-component folders)
- **Shared layout** — `user/layout.jsx` wraps all `/user/*` routes with Header + LeftPane + `<Outlet>`
- **Pages** — each page is in its own folder under `pages/` with co-located services/constants
- **Shared services/constants** — `user/service.js` and `user/constants.js` are imported by multiple pages
- **State** — Zustand for global auth state; component-level state for local UI
- **API calls** — shared service at `user/service.js`; page-specific services co-located with page
- **Tailwind CSS** — utility-first styling (Tailwind v4)
- **Routing** — React Router v7 with nested routes; `ProtectedRoute` wraps authenticated routes
