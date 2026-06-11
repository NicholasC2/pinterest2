import { ChevronUp } from "lucide-react";

export function Menu(options: {username: string, isAccountMenuOpen: boolean;}) {
	return (
		<>
			<div
			className="account-menu"
			style={{ display: options.isAccountMenuOpen ? 'flex' : 'none' }}
			>
				<span>{options.username}</span>
				<button>Profile</button>
				<button>Account Settings</button>
				<button>Logout</button>
			</div>
		</>
	)
}

export function LoggedIn(options: {profileImageUrl: string | undefined, isAccountMenuOpen: boolean, setIsAccountMenuOpen: Function}) {
	return (
		<>
			<div
				className="account-trigger"
				onClick={() => options.setIsAccountMenuOpen(!options.isAccountMenuOpen)}
			>
				<div className={'account-button' + ( options.isAccountMenuOpen ? " open" : "")}>
					<ChevronUp size={20} />
				</div>
				<a className="avatar">
					<img src={options.profileImageUrl ?? "/assets/placeholder.jpeg"} alt="Profile" />
				</a>
			</div>
		</>
	)
}

export function notLoggedIn() {

}
