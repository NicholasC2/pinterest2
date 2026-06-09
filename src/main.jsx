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
      <div className="navbar row">
        <div className="column navigation">
          <a href="/">test</a>
          <button>test</button>
        </div>
        <div className="row white-space">

        </div>
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