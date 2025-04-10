import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MainContext } from './context/mainContext.tsx'

createRoot(document.getElementById('root')!).render(
  <MainContext>
    <App />
  </MainContext>
)
