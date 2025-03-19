import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CoverLetterGeneratorDisplay from './components/CoverLetterGeneratorDisplay/CoverLetterGeneratorDisplay.tsx'
import NotFound from './pages/NotFound'
import TokenSettings from './pages/Settings/TokenSettings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <App />,
    children: [
      {
        path: '',
        element: <CoverLetterGeneratorDisplay />,
        errorElement: <NotFound />,
      },
      {
        path: 'token-settings',
        element: <TokenSettings />,
        errorElement: <NotFound />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
