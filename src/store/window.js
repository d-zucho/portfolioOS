import { create } from "zustand"
import {immer} from "zustand/middleware/immer";
import {INITIAL_Z_INDEX, WINDOW_CONFIG} from "@constants/index.js";

const useWindowStore = create(immer((set) => ({
	windows: WINDOW_CONFIG,
		nextZindex: INITIAL_Z_INDEX + 1,

// 	FUNCTIONS
	openWindow: (windowKey, data = null) => set((state) => {
		const win = state.windows[windowKey]
		if (!win) return
		win.isOpen = true
		win.zIndex = state.nextZindex++
		win.data = data ?? win.data
		state.nextZindex++

	}),
	closeWindow: (windowKey) => set((state) => {
		const win = state.windows[windowKey]
		if (!win) return
		win.isOpen = false
		win.zIndex = INITIAL_Z_INDEX
		win.data = null

	}),
	focusWindow: (windowKey) => set((state) => {
		const win = state.windows[windowKey]
		win.zIndex = state.nextZindex++

	})
})))

export default  useWindowStore;