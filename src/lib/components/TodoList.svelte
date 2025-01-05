<script>
  import { todoTasks } from './store';
  import TodoInput from './TodoInput.svelte';

  function finishTask(index, isChecked) {
    todoTasks.update(tasks => {
      tasks[index].status = isChecked ? 'Finish' : 'In progress';
      return tasks;
    });
  }

  let showModal = false;
  function addTask() {
    showModal = true;
  }
  function closeAddTask() {
    showModal = false;
  }
</script>

<div>
    <div class="flex justify-between items-center mb-4">
        <div class="text-2xl font-semibold mt-10">Today's tasks</div>
        <div>
            <button 
                type="button" 
                onclick={addTask}
                class="bg-indigo-500 text-white rounded-full px-5 py-2.5 me-2 mb-2 focus:ring-4 focus:ring-indigo-200 font-medium"
            >
                New task
            </button>
        </div>
      </div>
  <div >
    {#each $todoTasks as task, i}
      <div class="bg-white rounded-lg shadow-md p-4 m-2">
        <div class="flex">
            <input 
            type="checkbox" 
            checked={task.status === 'Finish'} 
            onchange={e => finishTask(i, e.target.checked)} 
            class="cursor-pointer rounded-full w-6 h-6 mr-4"
            disabled={task.status === "Finish"} />
            <p class={`text-lg ${task.status === "Finish" ? 'line-through text-gray-500':''}`}>{task.name}</p>
        </div>
        <div class="text-right text-gray-500">{task.deadline}</div>
      </div>
    {/each}
  </div>
  <TodoInput showModal={showModal} onClose={closeAddTask}/>
</div>
