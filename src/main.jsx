import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { CourseProvider } from './context/CourseContext'
import './index.css'
import App from './App.jsx'

import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
