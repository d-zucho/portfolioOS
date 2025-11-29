import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

import {Dock, Navbar, Welcome} from "@components";
import {Finder, Resume, Safari, Terminal, Text, Image} from "@windows";

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
	</main>
	);
};

export default App;