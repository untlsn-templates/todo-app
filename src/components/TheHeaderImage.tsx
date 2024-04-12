import createDarkMode from '~/hooks/createDarkMode';
import clsx from 'clsx';

export default function TheHeaderImage() {
	const [darkMode, setDarkMode] = createDarkMode();

	return (
		<div
			class={clsx(
				'w-full h-100 bg-cover bg-center',
				'md:bg-image-desktop-light',
				'md:dark:bg-image-desktop-dark',
				'bg-image-mobile-light',
				'dark:bg-image-mobile-dark',
			)}
		/>
	);
}
