import dayjs from "dayjs";

import {NAV_ICONS, NAV_LINKS} from "@constants/index.js";
import useWindowStore from "@store/window.js";

const Navbar = () => {
	const { openWindow } = useWindowStore()
	return (
		<nav>
			<div>
				<img src="/images/logo.svg" alt="logo"/>
				<p className={'font-bold'}>Danny's Portfolio</p>

				<ul>
					{NAV_LINKS.map(({ id, name, type}) => (
						<li
							key={id}
							onClick={() => openWindow(type)}
						>{name}</li>
					))

					}
				</ul>
			</div>

			<div>
				<ul>
					{NAV_ICONS.map(({id, img}) => (
						<li key={id}>
							<img src={img} alt={`icon-${id}`} />
						</li>
					))}
				</ul>

				<time>{dayjs().format('ddd MMM D h:mm A')}</time>
			</div>
		</nav>
	);
};

export default Navbar;