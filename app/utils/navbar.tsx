import { Search } from "lucide-react";
import "../assets/css/navbar.css"
import { TButton, TInput, TNavbar } from "@t-apps/ui";

export default function Navbar() {
	return (
		<TNavbar className="navbar">
			<div className="nav-links">
                <TButton href="/">Home</TButton>
			</div>
			<div className="search t-end">
                <TInput />
				<TButton>
				    <Search className="center-margin" />
				</TButton>
			</div>
			<div className="account">
				<TButton className="login">Log in</TButton>
				<TButton className="signup">Sign up</TButton>
			</div>
		</TNavbar>
	);
}
