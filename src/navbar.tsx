import { Link } from "react-router-dom";
import { LoggedIn, Menu } from "./account";
import { useState } from "react";

export default function() {
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  	const sessionID = document.cookie;

	console.log(sessionID)
    return (
		<>
			<nav className="navbar">
				<div className="nav-links">
					<Link to="/">Home</Link>
				</div>
				<div className="navbar-spacer" />
				<LoggedIn setIsAccountMenuOpen={setIsAccountMenuOpen} isAccountMenuOpen={isAccountMenuOpen} profileImageUrl='https://github.com/favicon.ico' />
			</nav>

			<Menu isAccountMenuOpen={isAccountMenuOpen} username='s'/>
		</>
    );
}