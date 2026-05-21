import { useState } from 'react'
import placeholderImage from './assets/placeholder.jpeg'
import './App.css'

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
        <div class="row search">
          <input></input>
          <button>Search</button>
        </div>
        <div class="row">
          <button>nav</button>
          <button>nav</button>
        </div>
        <div class="row">
          <button>nav</button>
          <button>nav</button>
        </div>
        <div class="row">
          <button>nav</button>
          <button>nav</button>
        </div>
        <div class="row">
          <button>nav</button>
          <button>nav</button>
        </div>
        <div class="row">
          <button>nav</button>
          <button>nav</button>
        </div>
      </div>
      <div class="content">
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
        <div class="item">
          <img src={placeholderImage} alt="placeholder" />
        </div>
      </div>
    </>
  )
}

export default App
