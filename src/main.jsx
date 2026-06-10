import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import placeholderImage from './assets/placeholder.jpeg'
import { ChevronUp, ChevronDown } from "lucide-react";
import { Account } from "./accounts/account"

import './navbar.css'
import './colors.css'
import './global.css'

function App() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/explore">Explore</a>
        </div>

        <div className="navbar-spacer" />

        <div
          className="account-trigger"
          onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
        >
          <div className={'account-button' + ( isAccountMenuOpen ? " open" : "")}>
            <ChevronUp size={20} />
          </div>
          <a className="avatar">
            <img src={placeholderImage} alt="Profile" />
          </a>
        </div>
      </nav>

      <div
        className="account-menu"
        style={{ display: isAccountMenuOpen ? 'flex' : 'none' }}
      >
        <button>Profile</button>
        <button>Account Settings</button>
        <button>Logout</button>
      </div>

      <main className="content"></main>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)