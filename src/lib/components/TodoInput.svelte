<script>
  import { todoHandlers } from "$lib/stores/todoStore";
  import { todoTasks, priorities } from "./store";
  import { Modal } from 'flowbite-svelte';
  

  
  export let showModal = false;
  export let onClose;

  let newName = "";
  let newPriority = "Low";
  let newDeadline = "";

  function addTask() {
    if (newName) {
      let newTask = {
        name: newName,
        priority: newPriority,
        deadline: newDeadline,
        status: "In progress"
      }

      // todoTasks.update(tasks => [...tasks, newTask]);
      console.log(newTask);
      todoHandlers.createTodo(newTask);
      todoHandlers.getTodos();
      onClose();
    } else {
      alert('Please fill in task name');
    }
  }
</script>

<Modal bind:open={showModal}>
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-lg font-semibold mb-4">Add new task</h2>
      <!-- Name -->
      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium text-gray-700">
          <input 
          type="text"
          class="border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          placeholder="Enter task name"
          bind:value={newName}>
          Task name
        </label>
      </div>
      <!-- Datepicker -->
      <div class="relative max-w-sm">
      
        <input 
          id="datepicker-actions" 
          bind:value={newDeadline}
          datepicker 
          datepicker-buttons 
          datepicker-autoselect-today 
          type="date" 
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
</Modal>