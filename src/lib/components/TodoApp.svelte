<script>
  import { name, priorities } from './store';
  import TodoList from './TodoList.svelte';
</script>

<div>
  <div class="text-4xl font-bold mb-6">What's up {$name}</div>
  <!-- Category -->
  <div>
    <div class="text-2xl font-semibold mb-4">Category</div>
    <div class="flex gap-4">
      {#each $priorities as priority, i}
        <!-- <div class="flex-1 bg-white rounded shadow-md p-4 "> -->
        <div class="flex-1 bg-white rounded-lg shadow-md p-4 ">
          <p class="text-sm text-gray-400 mb-2">{priority.count} tasks</p>
          <p 
            class="font-semibold text-2xl" 
            class:text-green-500={priority.color === "green"}
            class:text-yellow-500={priority.color === "yellow"}
            class:text-red-500={priority.color === "red"}
          >{priority.name}</p>
        </div>
      {/each}
    </div>
  </div>

  <TodoList />
</div>
