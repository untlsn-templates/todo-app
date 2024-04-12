import { createEffect, createSignal, onMount } from 'solid-js';

const KEY = 'dark-mode';

export default function createDarkMode() {
	const [darkMode, setDarkMode] = createSignal(false);

	onMount(() => {
		const storage = localStorage.getItem(KEY);
		if (storage) {
			setDarkMode(storage == 'true');
			return;
		}
		setDarkMode(matchMedia('(prefers-color-scheme: dark)').matches);
	});
	createEffect(() => {
		const snap = darkMode();
		localStorage.setItem(KEY, String(snap));
		document.body.classList.toggle('dark', snap);
	});

	return [
		darkMode,
		() => {
			setDarkMode(!darkMode());
		},
	] as const;
}
