import { JSXElement, Ref } from 'solid-js';
import clsx from 'clsx';
import { Dynamic } from 'solid-js/web';

type ToDoPointProps = {
	ref?:        Ref<HTMLLIElement>
	children:    JSXElement,
	class?:      string,
	isDone:      boolean,
	onChange?(): void
	standalone?: boolean
}

export default function ToDoPoint(props: ToDoPointProps) {

	return (
		<Dynamic
			component={props.standalone ? 'div' : 'li'}
			ref={props.ref}
			class={clsx(
				'sortable transition-transform cursor-move select-none p-4 bg-[#24263C] text-white',
				props.class,
			)}
		>
			{props.children}
		</Dynamic>
	);
}
