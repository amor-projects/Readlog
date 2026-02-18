# 📚 Readlog

A personal reading management app built with React — designed as both a **portfolio piece** and a deep-dive into React fundamentals and advanced patterns.

---

## ✨ Features

### ![MVP](https://img.shields.io/badge/MVP-Foundation-2EA44F?style=for-the-badge&logo=checkmarx&logoColor=white)
- [ ] Book list with **add / edit / delete**
- [ ] Reading status per book: `TBR` · `Reading` · `Finished` · `DNF`
- [ ] **Page / chapter progress** tracker
- [ ] **Star rating** for finished books
- [ ] **Notes** per book (thoughts, reflections)
- [ ] **Quotes** saved from books
- [ ] Filter & sort by genre, status, rating
- [ ] Persist data locally with `localStorage`
- [ ] Multi-page layout with React Router

### ![Phase 2](https://img.shields.io/badge/Phase_2-Enhanced_Experience-0075CA?style=for-the-badge&logo=rocket&logoColor=white)
- [ ] Dark / light mode toggle
- [ ] Custom `useBooks` hook
- [ ] Reading session timer (track time spent)
- [ ] Book search via **Open Library API** (auto-fill cover, author, pages)
- [ ] Debounced search input
- [ ] Mock auth with protected routes

### ![Phase 3](https://img.shields.io/badge/Phase_3-Performance_%26_Insights-E34F26?style=for-the-badge&logo=chartdotjs&logoColor=white)
- [ ] Stats dashboard — books per month, genre breakdown, reading pace (Recharts)
- [ ] Global state management (Zustand)
- [ ] Optimistic UI on updates
- [ ] Infinite scroll / pagination
- [ ] Drag-to-reorder reading list
- [ ] Code-split routes with `React.lazy` + `Suspense`
- [ ] Error boundaries

---

## 🧠 React Concepts Covered

| Concept | Where |
|---|---|
| `useState`, controlled forms | Book add/edit, notes, quotes |
| `useEffect` | localStorage sync, API fetch |
| `useMemo`, `useCallback` | Filtering, sorting, debounce |
| `useRef` | Session timer, scroll observer |
| `useContext` | Theme, auth |
| Custom hooks | `useBooks`, `useDebounce` |
| React Router | Multi-page layout, protected routes |
| `React.lazy` + `Suspense` | Code splitting |
| Error Boundaries | Global error fallback |
| External state (Zustand) | App-wide book store |

---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433e38?style=for-the-badge&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Open Library](https://img.shields.io/badge/Open_Library_API-4CAF50?style=for-the-badge&logo=internetarchive&logoColor=white)

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

---

## 📁 Planned Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level pages
├── hooks/            # Custom hooks (useBooks, useDebounce…)
├── context/          # Theme, Auth context
├── store/            # Zustand store (Phase 3)
└── utils/            # Helpers
```