import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GeneralProvider } from './context/GeneralContext.tsx'; 
import App from './App.tsx'


createRoot(document.querySelector('body')!).render(
  <StrictMode>
    <GeneralProvider>
      <App />
    </GeneralProvider>
  </StrictMode>,
)
