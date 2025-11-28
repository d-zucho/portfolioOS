import {useRef} from "react";
import { Tooltip } from 'react-tooltip'
import {DOCK_APPS} from "@constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "@store/window.js";


const Dock = () => {
	const { openWindow, closeWindow, windows } = useWindowStore()
	const dockRef = useRef(null)

	useGSAP(() => {
		const dock = dockRef.current
		if (!dock) return

		const icons = dock.querySelectorAll('.dock-icon')

		const animateIcons = (mouseX) => {
			const { left } = dock.getBoundingClientRect()

			icons.forEach((icon) => {
				const { left: iconLeft, width } = icon.getBoundingClientRect()
				// getBoundingClientRect() returns an object with left, top, right, bottom, width, and height properties.

				const center = iconLeft - left + width / 2
				// to get the center of the icon, we subtract the left position of the icon from the left position of the dock container,
				// add the width of the icon, and divide by 2 to get the center of the icon.
				const distance = Math.abs(mouseX - center)
				const intensity = Math.exp(-(distance ** 3.5) / 20000)

				gsap.to(icon, {
					scale: 1 + 0.25 * intensity,
					y: -15 * intensity,
					duration: 0.2,
					ease: "power1.out",
				})
			})
		}

		const handleMouseMove = (e) => {
			const { left } = dock.getBoundingClientRect()

			animateIcons(e.clientX - left)
			// this will animate the icons based on the mouse position
			// relative to the dock container by subtracting the left position of the dock container from the mouse position.
		}

		const resetIcons = () => icons.forEach((icon) => {
			gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" })
		})
		dock.addEventListener('mousemove', handleMouseMove)
		dock.addEventListener('mouseleave', resetIcons)

		return () => {
			dock.removeEventListener('mousemove', handleMouseMove)
			dock.removeEventListener('mouseleave', resetIcons)
		}
	}, [])


	const toggleApp = (app) => {
		if (!app.canOpen) return;

		const window = windows[app.id]

		if (!window) {
			console.error(`Window with id ${app.id} not found`)
		}

		if (window.isOpen) {
			closeWindow(app.id)
		} else {
			openWindow(app.id)
		}


	}

	return (
		<section id={'dock'}>
			<div ref={dockRef} className={'dock-container'}>
				{
					DOCK_APPS.map(({id, name, icon, canOpen}) => (
						<div key={id ?? name} className={'relative flex justify-center'}>
							<button
								type={"button"}
								className={'dock-icon'}
								aria-label={name}
								data-tooltip-id={'dock-tooltip'}
								data-tooltip-content={name}
								data-tooltip-delay-show={150}
								disabled={!canOpen}
								onClick={() => toggleApp({id, canOpen})}
							>
								<img
									src={`/images/${icon}`}
									alt={name}
									loading={"lazy"}
									className={canOpen ? '' : 'opacity-60'}
								/>
							</button>
						</div>
					))
				}

				<Tooltip id={'dock-tooltip'} place={'top'} className={'tooltip'} effect={'solid'} delayShow={150} />
			</div>

		</section>
	);
};

export default Dock;