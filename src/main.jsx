import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import placeholderImage from './assets/placeholder.jpeg'
import './index.css'

import './colors.css'
import './global.css'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="menuButton"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
      <div className={`navbar ${open ? 'open' : ''}`}>
        <label>Search:</label>
        <div className="row search">
          <input />
          <button>Search</button>
        </div>
        <hr></hr>
      </div>
      <div className="content">

      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)