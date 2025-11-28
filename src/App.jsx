import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

import {Dock, Navbar, Welcome} from "@components";
import {Resume, Safari, Terminal} from "@windows";

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
	</main>
	);
};

export default App;