import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

import {Dock, Navbar, Welcome, Home} from "@components";
import {
	Finder,
	Resume,
	Safari,
	Terminal,
	Text,
	Image,
	Contact
} from "@windows";

gsap.registerPlugin(Draggable);

const App = () => {
	return (
	<main>
		<Navbar />
		<Welcome />
		<Dock />

		<Terminal />
		<Safari />
		<Resume />
		<Finder />
		<Text />
		<Image />
		<Contact />
		<Home />
	</main>
	);
};

export default App;