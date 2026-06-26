import Navbar from "./utils/navbar";
import Gallery from "./utils/gallery";

export default function Home() {
	return (
		<>
			<Navbar />

			<Gallery images={[]} />
		</>
	);
}
