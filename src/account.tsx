import { useState } from 'react'
import { ChevronUp } from "lucide-react";

type LoggedInProps = {
	username: string;
	profileImageUrl: string | undefined;
};

export function LoggedIn({ username, profileImageUrl }: LoggedInProps) {
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

	return (
		<>
			<div
				className="account-trigger"
				onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
			>
				<div className={'account-button' + ( isAccountMenuOpen ? " open" : "")}>
					<ChevronUp size={20} />
				</div>
				<a className="avatar">
					<img src={profileImageUrl ?? "/assets/placeholder.jpeg"} alt="Profile" />
				</a>
			</div>
		</>
	)
}

export function notLoggedIn() {

}
