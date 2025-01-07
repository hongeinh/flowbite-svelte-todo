<script>
    import { todoHandlers } from "$lib/stores/todoStore";
    import { priorities } from "$lib/components/store";

    let newName = "";
    let newPriority = "Low";
    let newDeadline = "";

    async function handleSubmit(event) {
        console.log("Form submission triggered");
        event.preventDefault(); // prevent default form submission
        if (newName) {
            const newTask = {
                name: newName,
                priority: newPriority,
                deadline: newDeadline,
                done: false,
            };

            console.log("New task", newTask);
            try {
                await todoHandlers.createTodo(newTask);
                await todoHandlers.getTodos();
            } catch (error) {
                console.error("Error during task submission:", error);
                alert("Failed to create the task");
            }
            window.history.back();
        } else {
            alert("Please fill in task name");
        }
    }
</script>

<div>
    <h2 class="text-lg font-semibold  mb-4 mt-10">Add new task</h2>
    <form
        onsubmit={handleSubmit}
        class="bg-white rounded-lg p-6 w-96 space-y-4"
    >
        <!-- Name -->
        <div class="mb-4">
            <label
                for="name"
                class="block mb-1 text-sm font-medium text-gray-700"
            >
                Task name
            </label>
            <input
                id="name"
                type="text"
                class="border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Enter task name"
                bind:value={newName}
            />
        </div>
        <!-- Deadline -->
        <div class="relative max-w-sm">
            <label for="deadline">Deadline</label>
            <input
                id="deadline"
                bind:value={newDeadline}
                datepicker
                datepicker-buttons
                datepicker-autoselect-today
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Select deadline"
            />
        </div>
        <div class="mb-4">
            <label for="priority">Priority</label>
            <select
                id="priority"
                bind:value={newPriority}
                class="border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            >
                {#each $priorities as priority, i}
                    <option value={priority.name} class=""
                        >{priority.name}</option
                    >
                {/each}
            </select>
        </div>
        <div>
            <button
                type="button"
                class="px-4 py-2 rounded-lg bg-white text-indigo-500 outline outline-1 outline-indigo-500"
                onclick={() => window.history.back()}>Cancel</button
            >
            <button
                type="submit"
                class="px-4 py-2 rounded-lg bg-indigo-500 text-white"
                >Add task</button
            >
        </div>
    </form>
</div>
