import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ClickSpark from './Animations/ClickEvent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClickSpark sparkColor='#FFF'
                  sparkSize={10}
                  sparkRadius={15}
                  sparkCount={8}
                  duration={400}>
        <App />
      </ClickSpark>
    </BrowserRouter>
  </StrictMode>,
)
