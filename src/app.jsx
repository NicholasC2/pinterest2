import { useState } from 'react'
import placeholderImage from './assets/placeholder.jpeg'
import { Link } from "react-router-dom";
import { LoggedIn, notLoggedIn } from "./account"
import { Account } from '../accounts/account';

export default function() {
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

	return (
		<>
			<nav className="navbar">
				<div className="nav-links">
					<Link to="/">Home</Link>
				</div>
				<div className="navbar-spacer" />
				<LoggedIn username='s' />
			</nav>

			<div
			className="account-menu"
			style={{ display: isAccountMenuOpen ? 'flex' : 'none' }}
			>
				<button>Profile</button>
				<button>Account Settings</button>
				<button>Logout</button>
			</div>
			<main className="content">

			</main>
		</>
	)
}
