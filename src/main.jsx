import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import App from './App.jsx';
import Home from './pages/Home.jsx'
import Discover from './pages/Discover.jsx';
import Favorites from './pages/Favorites.jsx';
import Quotes from './pages/Quotes.jsx';
import Readlog from './pages/Readlog.jsx';
import MyLists from './pages/MyLists.jsx';
import Edition from './pages/Edition.jsx';
import Work from './pages/Work.jsx';
import Author from './pages/Author.jsx';

import './index.css'

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: async () => {
            const [weekly, monthly] = await Promise.all([
              fetch('/api/trending?duration=weekly'),
              fetch('/api/trending?duration=monthly')
            ]);
            if (weekly.failed || monthly.failed) {
              throw new Response(`Error Getting Trends ${weekly.message}`)
            }
            return {
              weeklyTrending: await weekly.json(),
              monthlyTrending: await monthly.json()
            }
          }
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'discover',
          element: <Discover />
        },
        {
          path: 'favorites',
          element: <Favorites />
        },
        {
          path: 'quotes',
          element: <Quotes />
        },
        {
          path: 'readlog',
          element: <Readlog />
        },
        {
          path: 'mylists',
          element: <MyLists />
        },
        {
          path: 'authors/:id',
          element: <Author />
        },
        {
          path: 'works/:id',
          element: <Work />
        },
        {
          path: 'editions',
          children: [
            {
              path: ':id',
              element: <Edition />
            },
            {
              path: ':isbn',
              element: <Edition />
            }
          ]
        },
        // {
        //   path: 'trending/:duration',
        //   element: <Trending />
        // },
        // {
        //   path: 'freebooks',
        // }
      ]
    }
  ])
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
