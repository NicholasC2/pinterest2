import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import Navbar from "./navbar";
import Gallery from "./gallery";
import Upload from "./fileUpload";

export default function Home() {
	return (
		<>
			<Navbar />

			<Upload />

			<Gallery images={[]} />
		</>
	);
}
