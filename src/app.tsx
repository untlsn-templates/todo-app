// @refresh reload
import 'untcss-reset';
import 'uno.css';
import { batch, createEffect, createSignal, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
	closestCenter,
	DragEvent,
	createSortable,
	DragDropProvider,
	DragDropSensors, DragOverlay, SortableProvider,
	useDragDropContext, Draggable,
} from '@thisbeyond/solid-dnd';
import ToDoPoint from '~/components/ToDoPoint';
import clsx from 'clsx';
import createDarkMode from '~/hooks/createDarkMode';
import TheHeaderImage from '~/components/TheHeaderImage';

type ToDo = {
	label: string,
	id:    number,
	done:  boolean
}

export default function App() {
	const [items, setItems] = createStore<ToDo[]>([]);
	const [activeItem, setActiveItem] = createSignal<string | number>();
	const [text, setText] = createSignal('');

	const findIndex = (draggable: Draggable) => {
		return items.findIndex((v) => v.id == draggable.id);
	};

	const onDragEnd = ({ draggable, droppable }: DragEvent) => {
		if (draggable && droppable) {
			const fromIndex = findIndex(draggable);
			const toIndex = findIndex(droppable);
			if (fromIndex !== toIndex) {
				const updatedItems = [...items];
				updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
				setItems(updatedItems);
			}
		}
	};

	const [darkMode, toggleDarkMode] = createDarkMode();

	return (
		<main class="bg-bg-secondary-light dark:bg-bg-secondary-dark min-h-screen font-sans">
			<TheHeaderImage />
			<div class="relative -top-60 w-240 mx-auto">
				<div class="flex justify-between items-center text-white">
					<h1 class="uppercase text-12 font-bold tracking-2">todo</h1>
					<button
						type="button"
						class="i-ph-moon-fill dark:i-ph-sun-fill text-8"
						onClick={toggleDarkMode}
					>
						Dark mode
					</button>
				</div>
				<form onSubmit={(ev) => {
					ev.preventDefault();
					setItems((v) => [...v, {
						label: text(),
						id:    v.length,
						done:  false,
					}]);
					setText('');
				}}
				>
					<input
						type="text"
						placeholder="New todo here..."
						value={text()}
						onChange={(ev) => {
							setText(ev.currentTarget.value);
						}}
					/>
				</form>
				<DragDropProvider
					onDragStart={(v) => setActiveItem(v.draggable.id)}
					onDragEnd={onDragEnd}
					collisionDetector={closestCenter}
				>
					<DragDropSensors />
					<ul class="column self-stretch">
						<SortableProvider ids={items.map((v) => v.id)}>
							<For each={items}>{(it) => {
								const sortable = createSortable(it.id);

								return (
									<ToDoPoint
										ref={sortable}
										isDone={it.done}
										class={clsx(
											sortable.isActiveDraggable && 'opacity-25',
										)}
									>
										{it.label}
									</ToDoPoint>
								);
							}}</For>
						</SortableProvider>
					</ul>
					<DragOverlay>
						<Show
							when={items.find((v) => v.id == activeItem())}
							keyed
							children={(it) => (
								<ToDoPoint
									standalone={true}
									isDone={it.done}
								>
									{it.label}
								</ToDoPoint>
							)}
						/>
					</DragOverlay>
				</DragDropProvider>
			</div>
		</main>
	);
}
