<script>
	import { todoStore, todoHandlers } from "$lib/stores/todoStore";
	import { priorities } from "$lib/components/store";
	import { onMount } from "svelte";

	let todoTasks = [];
	todoStore.subscribe((todoStore) => {
		console.log("Subscribe todo", todoStore?.todos);
		todoTasks = todoStore?.todos;
	});

	function finishTask(index, isChecked) {
		todoTasks.update((tasks) => {
			tasks[index].done = isChecked ? true : false;
			return tasks;
		});
	}

	async function completeTask(todoId, todoData) {
		await todoHandlers.updateTodo(todoId, todoData);
	}

	onMount(async () => {
		console.log("Fetching todos...");
		await todoHandlers.getTodos();
		console.log("Fetched todos");
	});

	function openCreateTodoPage() {
		window.location.href = "/createTodo";
	}
</script>

<div>
	<!-- Category -->
	<div>
		<div class="text-2xl font-semibold mb-4">Category</div>
		<div class="flex gap-4">
			{#each $priorities as priority, i}
				<!-- <div class="flex-1 bg-white rounded shadow-md p-4 "> -->
				<div class="flex-1 bg-white rounded-lg shadow-md p-4">
					<p class="text-sm text-gray-400 mb-2">
						{priority.count} tasks
					</p>
					<p
						class="font-semibold text-2xl"
						class:text-green-500={priority.color === "green"}
						class:text-yellow-500={priority.color === "yellow"}
						class:text-red-500={priority.color === "red"}
					>
						{priority.name}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex justify-between items-center mb-4">
		<div class="text-2xl font-semibold mt-10">Today's tasks</div>
		<div>
			<button
				type="button"
				onclick={openCreateTodoPage}
				class="bg-indigo-500 text-white rounded-full px-5 py-2.5 me-2 mb-2 focus:ring-4 focus:ring-indigo-200 font-medium"
			>
				New task
			</button>
		</div>
	</div>
	<div>
		{#each todoTasks as task, i}
			<div class="bg-white rounded-lg shadow-md p-4 m-2">
				<div class="flex">
					<input
						type="checkbox"
						checked={task.done === true}
						onchange={(e) => {
							task.done = true;
							completeTask(task.id, task);
						}}
						class="cursor-pointer rounded-full w-6 h-6 mr-4"
						disabled={task.done === true}
					/>
					<p
						class={`text-lg ${task.done === true ? "line-through text-gray-500" : ""}`}
					>
						{task.name}
					</p>
				</div>
				<div class="text-right text-gray-500">{task.deadline}</div>
			</div>
		{/each}
	</div>
</div>
