<script>
  import { todoTasks, priorities } from "./store";
  
  export let showModal = false;
  export let onClose;

  let newName = "";
  let newPriority = "Low";
  let newDeadline = "";

  function addTask() {
    if (newName) {
      newTask = {
        name: newName,
        priority: newPriority,
        deadline: newDeadline,
        status: "In progress"
      }

      todoTasks.update(tasks => [...tasks, newTask]);

      onClose();
    } else {
      alert('Please fill in task name');
    }
  }
</script>

{#if showModal}
<div class="fixed inset-0 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-96">
    <h2 class="text-lg font-semibold mb-4">Add new task</h2>
    <!-- Name -->
    <div class="mb-4">
      <label class="block mb-1 text-sm font-medium text-gray-700">Task name</label>
      <input 
        type="text"
        class="w-full border rounded-lg p-2  focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        placeholder="Enter task name"
        bind:value={newName}>
    </div>
    <!-- Datepicker -->
    <div class="relative max-w-sm">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
         <svg 
          class="w-4 h-4 text-gray-500 dark:text-gray-400" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="currentColor" 
          viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
      </div>
      <input 
        id="datepicker-actions" 
        bind:value={newDeadline}
        datepicker 
        datepicker-buttons 
        datepicker-autoselect-today 
        type="text" 
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" 
        placeholder="Select deadline">
    </div>
    <!-- Priority -->
    <div class="mb-4">
      <select 
        bind:value={newPriority} 
        class="border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
        {#each $priorities as priority, i}
          <option 
            value={priority.name} 
            class=""
          >{priority.name}</option>
        {/each}
      </select>
    </div>

    <!-- Button -->
    <div class="flex justify-end gap-4">
      <button 
        type="button"
        class="px-4 py-2 rounded-lg bg-white text-indigo-500 outline outline-indigo-500"
        onclick={onClose}  
      >Close</button>
      <button 
        type="button"
        class="px-4 py-2 rounded-lg bg-indigo-500 text-white"
        onclick={addTask}  
      >Add task</button>

    </div>
  </div>
</div>
{/if}