import Link from "next/link";

export default function NotFound() {
	return (
        <div className="center">
            <h1>Error 404 : Page Not Found</h1>
            <p>Sorry, this page couldn't be found.</p>

            <Link href="/">
                Go Home
            </Link>
        </div>
	);
}
